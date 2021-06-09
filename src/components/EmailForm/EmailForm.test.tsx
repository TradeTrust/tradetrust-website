import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmailForm } from "./EmailForm";

describe("emailForm", () => {
  it("should have hidden input tag with value='contact', for netlify email to work", () => {
    const history = createMemoryHistory();
    const container = render(
      <Router history={history}>
        <EmailForm />
      </Router>
    );
    const inputNetlify = container.getByDisplayValue("contact");

    expect(inputNetlify).not.toBeNull();
    expect(inputNetlify).toHaveAttribute("type", "hidden");
  });

  it("should have full name field", () => {
    const history = createMemoryHistory();
    const container = render(
      <Router history={history}>
        <EmailForm />
      </Router>
    );

    expect(container.getByPlaceholderText("* Full Name")).not.toBeNull();
  });

  it("should have email field", () => {
    const history = createMemoryHistory();
    const container = render(
      <Router history={history}>
        <EmailForm />
      </Router>
    );

    expect(container.getByPlaceholderText("* Email Address")).not.toBeNull();
  });

  it("should have organisation field", () => {
    const history = createMemoryHistory();
    const container = render(
      <Router history={history}>
        <EmailForm />
      </Router>
    );

    expect(container.getByPlaceholderText("* Name of your organisation")).not.toBeNull();
  });

  it("should have message field", () => {
    const history = createMemoryHistory();
    const container = render(
      <Router history={history}>
        <EmailForm />
      </Router>
    );

    expect(container.getByPlaceholderText("Message")).not.toBeNull();
  });
});
