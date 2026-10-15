import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Header_v2 from "../header_v2/Header_v2.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

describe("Header_v2", () => {
  it("renders the navigation labels", () => {
    renderWithProviders(<Header_v2 />);

    ["Discover", "Trending", "Browse", "New Story", "Profile", "Sign In"].forEach((label) =>
      expect(screen.getByText(label)).toBeInTheDocument()
    );
  });

  it("marks the link for the current route as active", () => {
    renderWithProviders(<Header_v2 />, { route: "/view_stories" });

    expect(screen.getByText("Browse").closest("a")).toHaveClass("active");
    expect(screen.getByText("Discover").closest("a")).not.toHaveClass("active");
  });

  it("opens the mobile search bar from the toggle button", () => {
    const { container } = renderWithProviders(<Header_v2 />);

    expect(screen.queryByPlaceholderText("Search stories...")).toBeNull();
    fireEvent.click(container.querySelector(".mobile-search-toggle"));
    expect(screen.getByPlaceholderText("Search stories...")).toBeInTheDocument();
  });
});
