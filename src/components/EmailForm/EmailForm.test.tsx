import React from "react";
import { render } from "@testing-library/react";

import { EmailForm } from "./EmailForm";

describe("emailForm", () => {
  it("should have hidden input tag with value='contact', for netlify email to work", () => {
    const container = render(<EmailForm />);
    const inputNetlify = container.getByDisplayValue("contact");

    expect(inputNetlify).not.toBeNull();
    expect(inputNetlify).toHaveAttribute("type", "hidden");
  });

  it("should have required full name field", () => {
    const container = render(<EmailForm />);
    const field = container.getByPlaceholderText("* Full Name");

    expect(field).not.toBeNull();
    expect(field).toHaveAttribute("required");
  });

  it("should have required email field", () => {
    const container = render(<EmailForm />);
    const field = container.getByPlaceholderText("* Email Address");

    expect(field).not.toBeNull();
    expect(field).toHaveAttribute("required");
  });

  it("should have required organisation field", () => {
    const container = render(<EmailForm />);
    const field = container.getByPlaceholderText("* Name of your organisation");

    expect(field).not.toBeNull();
    expect(field).toHaveAttribute("required");
  });

  it("should have message field", () => {
    const container = render(<EmailForm />);
    const field = container.getByPlaceholderText("Message");

    expect(field).not.toBeNull();
    expect(field).not.toHaveAttribute("required");
  });
});
