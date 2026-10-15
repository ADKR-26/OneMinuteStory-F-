import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ViewTile from "../viewTile/ViewTile.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

const stories = [
  { _id: "s1", title: "Midnight Train", likes: 2, likedBy: [], email: "a@b.com", author: "night_owl" },
  { _id: "s2", title: "Lighthouse", likes: 0, likedBy: [], email: "c@d.com", author: "keeper" },
];

beforeEach(() => {
  vi.clearAllMocks();
  axios.get.mockResolvedValue({ data: { mainCoverImage: "cover.png" } });
});

describe("ViewTile", () => {
  it("renders a card for each story", () => {
    renderWithProviders(<ViewTile />, { preloadedState: { storyData: stories } });

    expect(screen.getByText("STORIES")).toBeInTheDocument();
    expect(screen.getByText("Midnight Train")).toBeInTheDocument();
    expect(screen.getByText("Lighthouse")).toBeInTheDocument();
  });

  it("fetches a cover image for each story", async () => {
    renderWithProviders(<ViewTile />, { preloadedState: { storyData: stories } });

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("storyId=s1"));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("storyId=s2"));
    expect((await screen.findAllByAltText("Cover Image"))[0]).toHaveAttribute("src", "cover.png");
  });

  it("renders only the heading when there are no stories", () => {
    renderWithProviders(<ViewTile />, { preloadedState: { storyData: [] } });

    expect(screen.getByText("STORIES")).toBeInTheDocument();
    expect(screen.queryByText("Midnight Train")).toBeNull();
  });
});
