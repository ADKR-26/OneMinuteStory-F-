import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import HomePage from "../homePage/HomePage.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

vi.mock("axios", () => ({
  default: { get: vi.fn(), post: vi.fn(), delete: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
});

describe("HomePage (legacy)", () => {
  it("renders stories from the store as cards", () => {
    renderWithProviders(<HomePage />, {
      preloadedState: { storyData: [{ _id: "1", story: { content: "Story one" } }] },
    });

    expect(screen.getByText("Story one")).toBeInTheDocument();
  });

  it("submits the typed story and clears the box", async () => {
    renderWithProviders(<HomePage />);

    const box = screen.getByPlaceholderText("Write your Story Here...");
    fireEvent.change(box, { target: { value: "A new tale" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Story" }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/api/addStory"), expect.objectContaining({ title: "A new tale" }))
    );
    expect(box).toHaveValue("");
  });
});
