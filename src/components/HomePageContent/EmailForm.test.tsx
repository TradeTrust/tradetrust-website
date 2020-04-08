import React from "react";
import { render } from "@testing-library/react";
import { EmailForm } from "./EmailForm";

describe("portal", () => {
  it("should have hidden input value (contact) for netlify email to work", () => {
    const container = render(<EmailForm />);

    expect(container.getByDisplayValue("contact")).not.toBeNull();
  });
});
