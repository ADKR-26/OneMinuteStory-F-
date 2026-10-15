import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Profile from "../profile/Profile.jsx";
import { renderWithProviders } from "../../test/utils.jsx";
import { Routes, Route } from "react-router-dom";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

vi.mock("firebase/storage", () => ({
  getStorage: vi.fn(() => ({})),
  ref: vi.fn(),
  uploadBytesResumable: vi.fn(),
  getDownloadURL: vi.fn(),
}));

vi.mock("../../../firebase", () => ({ app: {} }));

const user = { _id: "u1", username: "alice", email: "a@b.com", googleUsed: false };
const signedIn = (extra = {}) => ({
  currentUser: { data: { ...user, ...extra } },
});

// Mirror the app's routing: Profile navigates to "/" after delete and sign-out,
// which unmounts it before the cleared currentUser re-renders.
const renderProfile = (options) =>
  renderWithProviders(
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<div>Home page</div>} />
    </Routes>,
    { route: "/profile", ...options }
  );

beforeEach(() => {
  vi.clearAllMocks();
  axios.post.mockResolvedValue({ data: {} });
  axios.delete.mockResolvedValue({ data: {} });
  axios.get.mockResolvedValue({ data: {} });
});

describe("Profile", () => {
  it("shows the current username and a disabled email", () => {
    renderProfile({ preloadedState: signedIn() });

    expect(screen.getByDisplayValue("alice")).toBeInTheDocument();
    expect(screen.getByDisplayValue("a@b.com")).toBeDisabled();
  });

  it("asks for a password only for non-Google accounts", () => {
    const { unmount } = renderProfile({ preloadedState: signedIn() });
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    unmount();

    renderProfile({ preloadedState: signedIn({ googleUsed: true }) });
    expect(screen.queryByPlaceholderText("Password")).toBeNull();
  });

  it("submits the changed username to the update endpoint", async () => {
    renderProfile({ preloadedState: signedIn() });

    fireEvent.change(screen.getByDisplayValue("alice"), { target: { value: "bob" } });
    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/OMS-api/user/update/u1"),
        expect.objectContaining({ username: "bob" })
      )
    );
  });

  it("shows the username-taken message when the update failed", () => {
    renderProfile({ preloadedState: { ...signedIn(), updateError: true } });

    expect(screen.getByText(/username is already in use/)).toBeInTheDocument();
  });

  it("deletes the account after confirming", async () => {
    renderProfile({ preloadedState: signedIn() });

    fireEvent.click(screen.getByText("Delete Account"));
    expect(await screen.findByText("Click on confirm to delete this account")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));

    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/user/delete/u1"))
    );
  });

  it("signs out after confirming", async () => {
    renderProfile({ preloadedState: signedIn() });

    fireEvent.click(screen.getByText("Sign out"));
    expect(await screen.findByText("Click on confirm to Sign Out from this account")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Confirm/ }));

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/signout"))
    );
  });

  it("does not sign out when the modal is cancelled", async () => {
    renderProfile({ preloadedState: signedIn() });

    fireEvent.click(screen.getByText("Sign out"));
    fireEvent.click(await screen.findByRole("button", { name: /Cancel/ }));

    expect(axios.get).not.toHaveBeenCalled();
  });
});
