import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import SignIn from "../signIn/SignIn.jsx";
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

const renderSignIn = (preloadedState) =>
  renderWithProviders(
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<div>Sign up page</div>} />
    </Routes>,
    { route: "/sign-in", preloadedState }
  );

beforeEach(() => {
  vi.clearAllMocks();
  axios.post.mockResolvedValue({ data: {} });
});

describe("SignIn", () => {
  it("renders the email, password and sign-in controls", () => {
    renderSignIn();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();
  });

  it("posts the typed credentials on submit", async () => {
    renderSignIn();

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "a@b.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "secret" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/signin"), {
        email: "a@b.com",
        password: "secret",
        googleUsed: false,
      })
    );
  });

  it("shows an error message after submitting when the store has an error", () => {
    renderSignIn({ error: true });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("links to the sign-up page", () => {
    renderSignIn();

    fireEvent.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Sign up page")).toBeInTheDocument();
  });
});
