import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import axios from "axios";
import HomePage2 from "../HomePage2.jsx";
import { Homepage } from "../../../constants/storyConstants";
import { renderWithProviders } from "../../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("HomePage2", () => {
  it("renders the title, description and both navigation buttons", () => {
    axios.get.mockResolvedValue({ data: [] });
    renderWithProviders(<HomePage2 />, { preloadedState: { storyData: [{ _id: "1" }] } });

    expect(screen.getByText(Homepage.TITLE)).toBeInTheDocument();
    expect(screen.getByText(Homepage.DESCRIPTION)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: Homepage.VIEW_BUTTON })).toHaveAttribute(
      "href",
      "/view_stories"
    );
    expect(screen.getByRole("link", { name: Homepage.ADD_BUTTON })).toHaveAttribute(
      "href",
      "/add_story"
    );
  });

  it("fetches stories on mount when none are loaded", async () => {
    axios.get.mockResolvedValue({ data: [{ _id: "1" }] });
    const { store } = renderWithProviders(<HomePage2 />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(String(axios.get.mock.calls[0][0])).toContain("/api/getStoryData");
    await waitFor(() =>
      expect(store.getState().oneMinuteStory.storyData).toEqual([{ _id: "1" }])
    );
  });

  it("does not refetch when stories are already loaded", () => {
    renderWithProviders(<HomePage2 />, { preloadedState: { storyData: [{ _id: "1" }] } });

    expect(axios.get).not.toHaveBeenCalled();
  });
});
