import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import Header from "../header/Header.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

describe("Header", () => {
  it("shows the main nav links", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("link", { name: "View Stories" })).toHaveAttribute("href", "/view_stories");
    expect(screen.getByRole("link", { name: "Add Story" })).toHaveAttribute("href", "/add_story");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });

  it("links to sign-in and shows 'Sign In' when logged out", () => {
    renderWithProviders(<Header />);

    expect(screen.getByText("Sign In").closest("a")).toHaveAttribute("href", "/sign-in");
  });

  it("links to profile and shows the user's picture when logged in", () => {
    renderWithProviders(<Header />, {
      preloadedState: { currentUser: { data: { email: "a@b.com", profilePicture: "pic.png" } } },
    });

    const img = screen.getByAltText("profile");
    expect(img).toHaveAttribute("src", "pic.png");
    expect(img.closest("a")).toHaveAttribute("href", "/profile");
  });

  it("toggles the mobile menu from the hamburger icon", () => {
    const { container } = renderWithProviders(<Header />);

    expect(container.querySelector(".link-container-mobile")).toBeNull();
    fireEvent.click(container.querySelector(".hamburger"));
    expect(container.querySelector(".link-container-mobile")).not.toBeNull();
    fireEvent.click(container.querySelector(".hamburger"));
    expect(container.querySelector(".link-container-mobile")).toBeNull();
  });
});
