import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import axios from "axios";
import StoryData from "../homepage2/StoryData.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "log").mockImplementation(() => {});
  axios.get.mockResolvedValue({ data: [] });
});

describe("StoryData", () => {
  it("renders one card per story, using the first scene's content", () => {
    renderWithProviders(<StoryData />, {
      preloadedState: {
        storyData: [
          { _id: "1", story: [{ content: "First tale" }] },
          { _id: "2", story: [{ content: "Second tale" }] },
        ],
      },
    });

    expect(screen.getByText("First tale")).toBeInTheDocument();
    expect(screen.getByText("Second tale")).toBeInTheDocument();
  });

  it("fetches stories on mount", async () => {
    renderWithProviders(<StoryData />);

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/api/getStoryData"))
    );
  });
});
