import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import About from "../about/About.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

describe("About", () => {
  it("renders the welcome heading", () => {
    renderWithProviders(<About />);

    expect(screen.getByText("Welcome to One Minute Story!")).toBeInTheDocument();
  });

  it("links the call to action to the add story page", () => {
    renderWithProviders(<About />);

    expect(screen.getByRole("link", { name: "Let's Begin" })).toHaveAttribute("href", "/add_story");
  });
});
