import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import TitleCard from "../Card/TitleCard.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

const baseProps = {
  titleData: "Midnight Train",
  id: "story-1",
  email: "owner@b.com",
  author: "night_owl",
  likes: 4,
  likedBy: [],
  coverImage: "cover.png",
};

const loggedIn = (email) => ({ currentUser: { data: { email } } });

beforeEach(() => {
  vi.clearAllMocks();
  axios.get.mockResolvedValue({ data: [] });
});

describe("TitleCard", () => {
  it("renders the title, author and like count", () => {
    renderWithProviders(<TitleCard {...baseProps} />);

    expect(screen.getByText("Midnight Train")).toBeInTheDocument();
    expect(screen.getByText(/night_owl/)).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("shows the cover image when one is provided", () => {
    renderWithProviders(<TitleCard {...baseProps} />);

    expect(screen.getByAltText("Cover Image")).toHaveAttribute("src", "cover.png");
  });

  it("shows the placeholder with the title when there is no cover image", () => {
    renderWithProviders(<TitleCard {...baseProps} coverImage={null} />);

    expect(screen.queryByAltText("Cover Image")).toBeNull();
    expect(screen.getAllByText("Midnight Train").length).toBeGreaterThan(0);
  });

  it("shows the delete icon only to the story owner", () => {
    const { container } = renderWithProviders(<TitleCard {...baseProps} />, {
      preloadedState: loggedIn("owner@b.com"),
    });
    expect(container.querySelector(".anticon-delete")).not.toBeNull();
  });

  it("hides the delete icon from other users", () => {
    const { container } = renderWithProviders(<TitleCard {...baseProps} />, {
      preloadedState: loggedIn("someone@else.com"),
    });
    expect(container.querySelector(".anticon-delete")).toBeNull();
  });

  it("likes the story when a logged-in user clicks the heart", async () => {
    axios.post.mockResolvedValue({ data: {} });
    const { container } = renderWithProviders(<TitleCard {...baseProps} />, {
      preloadedState: loggedIn("fan@b.com"),
    });

    fireEvent.click(container.querySelector(".anticon-heart"));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/api/likedBy/story-1"), {
        email: "fan@b.com",
      })
    );
  });

  it("stores the story id when View is clicked", () => {
    const { store } = renderWithProviders(<TitleCard {...baseProps} />);

    fireEvent.click(screen.getByText("View"));

    expect(store.getState().oneMinuteStory.titleId).toBe("story-1");
  });
});
