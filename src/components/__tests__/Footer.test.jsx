import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../footer/Footer.jsx";

vi.mock("../../store/utils/SocketContext", () => ({
  useSocket: () => ({ onlineUsers: 3 }),
}));

describe("Footer", () => {
  it("shows the online user count from the socket context", () => {
    render(<Footer />);

    expect(screen.getByText(/3\s*Online/)).toBeInTheDocument();
  });
});
