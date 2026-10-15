import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PlaceholderImage from "../PlaceholderImage/PlaceholderImage.jsx";

describe("PlaceholderImage", () => {
  it("shows the given name", () => {
    render(<PlaceholderImage name="Midnight Train" />);

    expect(screen.getByText("Midnight Train")).toBeInTheDocument();
  });

  it("shows 'No Image' when no name is given", () => {
    render(<PlaceholderImage />);

    expect(screen.getByText("No Image")).toBeInTheDocument();
  });
});
