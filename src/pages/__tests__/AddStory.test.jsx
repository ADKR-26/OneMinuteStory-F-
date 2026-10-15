import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, act } from "@testing-library/react";
import axios from "axios";
import AddStory from "../addStory/AddStory.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

const loggedIn = {
  currentUser: { data: { email: "a@b.com", username: "alice" } },
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "log").mockImplementation(() => {});
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("AddStory", () => {
  it("asks visitors to sign in when logged out", () => {
    renderWithProviders(<AddStory />);

    expect(screen.getByText(/Please Sign In before adding story/)).toBeInTheDocument();
  });

  it("shows the form and a 60 second timer when logged in", () => {
    renderWithProviders(<AddStory />, { preloadedState: loggedIn });

    expect(screen.getByPlaceholderText("Choose your title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell your story here....")).toBeInTheDocument();
    expect(screen.getByText("60s")).toBeInTheDocument();
  });

  it("prefills and locks the title when one is passed in", () => {
    renderWithProviders(<AddStory titleData="Lighthouse" />, { preloadedState: loggedIn });

    expect(screen.getByDisplayValue("Lighthouse")).toBeDisabled();
    expect(screen.getByPlaceholderText("Tell your story here....")).toBeEnabled();
  });

  it("counts down once the user starts typing", () => {
    vi.useFakeTimers();
    renderWithProviders(<AddStory titleData="Lighthouse" />, { preloadedState: loggedIn });

    fireEvent.change(screen.getByPlaceholderText("Tell your story here...."), {
      target: { value: "The lamp" },
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText("59s")).toBeInTheDocument();
  });

  it("resets the timer and clears the story on Reset", () => {
    vi.useFakeTimers();
    renderWithProviders(<AddStory titleData="Lighthouse" />, { preloadedState: loggedIn });

    fireEvent.change(screen.getByPlaceholderText("Tell your story here...."), {
      target: { value: "The lamp" },
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByText("60s")).toBeInTheDocument();
  });

  it("submits the title and story to the API", async () => {
    renderWithProviders(<AddStory />, { preloadedState: loggedIn });

    fireEvent.change(screen.getByPlaceholderText("Choose your title"), {
      target: { value: "Midnight Train" },
    });
    fireEvent.change(screen.getByPlaceholderText("Tell your story here...."), {
      target: { value: "Every passenger had the same ticket." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/addStory"),
        expect.objectContaining({
          title: "Midnight Train",
          creatorEmail: "a@b.com",
          creatorName: "alice",
        })
      )
    );
  });
});
