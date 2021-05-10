import { render, screen } from "@testing-library/react";
import React from "react";
import { VerifyingView } from "./VerifyingView";

describe("defaultView", () => {
  it("should display correct text while verifying document", () => {
    render(<VerifyingView />);
    expect(screen.getByTestId("verifying-document").textContent).toStrictEqual("Verifying Document...");
  });
});
