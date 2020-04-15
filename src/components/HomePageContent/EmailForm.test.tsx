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
});
