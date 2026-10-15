import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddExistingStory from "../AddExistinStory.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
  axios.post.mockResolvedValue({ data: {} });
});

describe("AddExistingStory", () => {
  it("prefills the title and shows the full 60 second timer", () => {
    renderWithProviders(<AddExistingStory title="Lighthouse" />);

    expect(screen.getByDisplayValue("Lighthouse")).toBeDisabled();
    expect(screen.getByText("Time Remaining: 60 seconds")).toBeInTheDocument();
  });

  it("starts a 5 second countdown when the user starts typing", () => {
    renderWithProviders(<AddExistingStory title="Lighthouse" />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Story Here"), {
      target: { value: "The lamp" },
    });

    expect(screen.getByText("Time Remaining: 5 seconds")).toBeInTheDocument();
  });

  it("resets the timer to 60 seconds on Reset", () => {
    renderWithProviders(<AddExistingStory title="Lighthouse" />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Story Here"), {
      target: { value: "The lamp" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByText("Time Remaining: 60 seconds")).toBeInTheDocument();
  });

  it("submits the story with the title", async () => {
    renderWithProviders(<AddExistingStory title="Lighthouse" />);

    fireEvent.change(screen.getByPlaceholderText("Enter Your Story Here"), {
      target: { value: "The lamp went dark" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add Story" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/addStory"),
        expect.objectContaining({ title: "Lighthouse" })
      )
    );
  });
});
