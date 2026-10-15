import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import SignUp from "../signUp/SignUp.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

vi.mock("firebase/auth", () => ({
  GoogleAuthProvider: class {},
  getAuth: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
}));

vi.mock("../../../firebase", () => ({ app: {} }));

const renderSignUp = () =>
  renderWithProviders(
    <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<div>Sign in page</div>} />
    </Routes>,
    { route: "/sign-up" }
  );

beforeEach(() => {
  vi.clearAllMocks();
  axios.post.mockResolvedValue({ data: {} });
});

describe("SignUp", () => {
  it("renders the username, email, password and sign-up controls", () => {
    renderSignUp();

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });

  it("posts the typed details on submit", async () => {
    renderSignUp();

    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "alice" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/signup"), {
        username: "alice",
        email: "a@b.com",
        password: "secret",
        googleUsed: false,
      })
    );
  });

  // KNOWN ISSUE: the page navigates to /sign-in right after dispatching, using
  // the store value from before the request finishes, so it does not wait for
  // the server's answer. Characterized here rather than changed.
  it("navigates to sign-in right after submit, before the server responds (known issue, characterized)", async () => {
    renderSignUp();

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    expect(await screen.findByText("Sign in page")).toBeInTheDocument();
  });
});
