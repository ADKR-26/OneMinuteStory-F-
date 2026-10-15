import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import OAuth from "../OAuth.jsx";
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

const googleUser = {
  user: { displayName: "Alice", email: "alice@gmail.com", photoURL: "photo.jpg" },
};

beforeEach(() => {
  vi.clearAllMocks();
  axios.post.mockResolvedValue({ data: {} });
});

describe("OAuth", () => {
  it("renders the Google button", () => {
    renderWithProviders(<OAuth data="signin" />);

    expect(screen.getByRole("button", { name: "Continue with Google" })).toBeInTheDocument();
  });

  it("signs in with Google on the signin page", async () => {
    signInWithPopup.mockResolvedValue(googleUser);
    renderWithProviders(<OAuth data="signin" />);

    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/google"), {
        email: "alice@gmail.com",
        googleUsed: true,
      })
    );
  });

  it("signs up with Google on the signup page, sending name and photo", async () => {
    signInWithPopup.mockResolvedValue(googleUser);
    renderWithProviders(<OAuth data="signup" />);

    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/google"), {
        name: "Alice",
        email: "alice@gmail.com",
        photo: "photo.jpg",
        googleUsed: true,
      })
    );
  });

  // KNOWN BUG: the catch branch calls signInUserGoogle(error), so the Error
  // object is sent to the backend as the email instead of showing a failure.
  it("on popup failure, still calls the backend with the error as the email (known bug, characterized)", async () => {
    const error = new Error("popup closed");
    signInWithPopup.mockRejectedValue(error);
    renderWithProviders(<OAuth data="signin" />);

    fireEvent.click(screen.getByRole("button", { name: "Continue with Google" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/OMS-api/auth/google"), {
        email: error,
        googleUsed: undefined,
      })
    );
  });
});
