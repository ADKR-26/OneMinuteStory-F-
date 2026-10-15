import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import Contact from "../contact/Contact.jsx";

vi.mock("@emailjs/browser", () => ({
  default: { send: vi.fn() },
}));

const fill = (name, value) =>
  fireEvent.change(document.querySelector(`[name="${name}"]`), { target: { name, value } });

beforeEach(() => {
  vi.clearAllMocks();
  emailjs.send.mockResolvedValue({ status: 200 });
});

describe("Contact", () => {
  it("shows a required-field message for each empty field after submit", () => {
    render(<Contact />);

    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(screen.getByText("Please enter your name")).toBeInTheDocument();
    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
    expect(screen.getByText("Please enter your message")).toBeInTheDocument();
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  // KNOWN BUG: formComplete is computed from the previous state inside
  // handleChange, so filling the fields in one pass never marks the form
  // complete and submit silently sends nothing. Characterized, not fixed.
  it("does not send when all fields are filled in one pass (known bug, characterized)", () => {
    render(<Contact />);

    fill("name", "Alice");
    fill("email", "alice@x.com");
    fill("message", "Hello");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("sends the message with emailjs and shows the thank-you note", async () => {
    render(<Contact />);

    fill("name", "Alice");
    fill("email", "alice@x.com");
    fill("message", "Hello");
    // Retype the last field so the form is complete for handleSubmit
    fill("message", "Hello again");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(1));
    const [, , params] = emailjs.send.mock.calls[0];
    expect(params).toMatchObject({ from_name: "Alice", from_email: "alice@x.com" });
    expect(params.message).toContain("Hello again");
    expect(await screen.findByText(/Thank you/)).toBeInTheDocument();
  });
});
