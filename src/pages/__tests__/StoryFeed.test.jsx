import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import StoryFeed from "../storyFeed/StoryFeed.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

const story = {
  _id: "s1",
  title: "Midnight Train",
  scenes: [
    { content: "Every passenger had the same ticket.", author: { userName: "night_owl" } },
    { content: "The conductor smiled.", author: { userName: "dev_user" } },
  ],
  story: [{ content: "Every passenger had the same ticket." }],
  creatorEmail: "night@example.com",
  creatorName: "night_owl",
  likedBy: [],
};

const preloaded = (extra = {}) => ({
  titleId: "s1",
  storyData: [story],
  currentUser: { data: { email: "a@b.com", username: "alice" } },
  ...extra,
});

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "log").mockImplementation(() => {});
  axios.get.mockResolvedValue({ data: { mainCoverImage: "cover.png" } });
  axios.post.mockResolvedValue({ data: { generatedStoryData: "Next part" } });
});

describe("StoryFeed", () => {
  it("shows the selected story's title and scenes", () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded() });

    expect(screen.getByText("MIDNIGHT TRAIN")).toBeInTheDocument();
    expect(screen.getByText(/Every passenger had the same ticket\./)).toBeInTheDocument();
  });

  it("fetches the cover image for the story", async () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded() });

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining("storyId=s1"))
    );
    expect(await screen.findByAltText("Cover Image")).toHaveAttribute("src", "cover.png");
  });

  it("switches between paragraph and block view", () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded() });

    expect(screen.getByText(/Paragraph/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("switch"));
    expect(screen.getByText(/Block/)).toBeInTheDocument();
  });

  it("hides the generate controls from logged-out visitors", () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded({ currentUser: null }) });

    expect(screen.queryByRole("button", { name: "AUTO GENERATE STORY" })).toBeNull();
  });

  it("requests a cover image when Generate Cover Image is clicked", async () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded() });

    fireEvent.click(screen.getByRole("button", { name: "Generate Cover Image" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/generateCoverImage"),
        expect.objectContaining({ story: expect.objectContaining({ storyId: "s1" }) })
      )
    );
  });

  // KNOWN BUG: handleGenerateStory reads generatedStoryData from the render-time
  // snapshot, which still holds the empty initial value, so the success text is
  // never shown and the error message always appears. Characterized, not fixed.
  it("shows the failure message after AUTO GENERATE (known bug, characterized)", async () => {
    renderWithProviders(<StoryFeed />, { preloadedState: preloaded() });

    fireEvent.click(screen.getByRole("button", { name: "AUTO GENERATE STORY" }));

    expect(
      await screen.findByText(/Sorry, we could not generate a story/)
    ).toBeInTheDocument();
  });

  // KNOWN BUG: with a titleId that matches no story, the effect reads
  // specificStory._id and throws instead of showing "No story found".
  it("throws when the selected story does not exist (known bug, characterized)", () => {
    expect(() =>
      renderWithProviders(<StoryFeed />, { preloadedState: preloaded({ titleId: "missing" }) })
    ).toThrow(TypeError);
  });
});
