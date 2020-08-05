import React from "react";
import { render } from "@testing-library/react";
import { AttachmentLink } from "./AttachmentLink";

describe("AttachmentLink", () => {
  it("should render filename correctly", () => {
    const container = render(<AttachmentLink filename="TradeTrust Tech Webinar 2.pdf" />);
    expect(container.getByText("TradeTrust Tech Webinar 2.pdf")).not.toBeNull();
  });

  it("should render download link with base64 correctly", () => {
    const container = render(
      <AttachmentLink filename="TradeTrust Tech Webinar 2.pdf" data={`123`} type="application/pdf" />
    );
    expect(container.getByText("Download")).not.toBeNull();
  });

  it("should render download link with direct asset correctly", () => {
    const container = render(
      <AttachmentLink
        filename="TradeTrust Tech Webinar 2.pdf"
        path="/static/images/webinar/tradetrust-tech-webinar-2.pdf"
      />
    );
    expect(container.getByText("Download")).not.toBeNull();
  });
});
