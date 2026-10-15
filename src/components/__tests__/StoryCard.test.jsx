import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import StoryCard from "../Card/StoryCard.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
  axios.get.mockResolvedValue({ data: [] });
});

describe("StoryCard", () => {
  it("renders the story text", () => {
    renderWithProviders(<StoryCard storyData="Once upon a time" id="1" />);

    expect(screen.getByText("Once upon a time")).toBeInTheDocument();
  });

  it("deletes the story by id when the delete icon is clicked", async () => {
    axios.delete.mockResolvedValue({ data: { deletedStory: {} } });
    const { container } = renderWithProviders(<StoryCard storyData="x" id="42" />);

    fireEvent.click(container.querySelector(".anticon-delete"));

    await waitFor(() =>
      expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining("/api/deleteStory/42"))
    );
  });
});
