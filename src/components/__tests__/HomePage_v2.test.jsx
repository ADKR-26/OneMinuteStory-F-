import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import axios from "axios";
import HomePage_v2 from "../homepage_v2/HomePage_v2.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("HomePage_v2", () => {
  it("renders the hero text and both call-to-action links", () => {
    axios.get.mockResolvedValue({ data: [{ _id: "1" }] });
    renderWithProviders(<HomePage_v2 />, { preloadedState: { storyData: [{ _id: "1" }] } });

    expect(screen.getByText("Collective Imagination")).toBeInTheDocument();
    expect(screen.getByText("Start Writing").closest("a")).toHaveAttribute("href", "/add_story");
    expect(screen.getByText("Browse Stories").closest("a")).toHaveAttribute("href", "/view_stories");
  });

  it("fetches stories on mount when none are loaded", async () => {
    axios.get.mockResolvedValue({ data: [] });
    renderWithProviders(<HomePage_v2 />);

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("/api/getStoryData"))
    );
  });
});
