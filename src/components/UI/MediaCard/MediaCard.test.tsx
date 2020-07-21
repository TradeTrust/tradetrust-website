import React from "react";
import { render } from "@testing-library/react";
import { MediaCard } from "./MediaCard";

describe("MediaCard", () => {
  it("should render title correctly", () => {
    const container = render(
      <MediaCard title="This is the title">
        <p>Some text here.</p>
      </MediaCard>
    );
    expect(container.queryByText("This is the title")).not.toBeNull();
  });

  it("should render youtube correctly", () => {
    const container = render(
      <MediaCard title="This is the title" youtubeEmbedCode="3-ZRuPCa2k4">
        <p>Some text here.</p>
      </MediaCard>
    );
    const iframe: any = container.getByTitle("This is the title");
    const link: any = container.getByText("This is the title");
    expect(iframe).not.toBeNull();
    expect(iframe.src).toMatch(/youtube.com\/embed/);
    expect(link).not.toBeNull();
    expect(link.href).toMatch(/youtube.com\/watch\?v=/);
  });

  it("should render placeholder text correctly", () => {
    const container = render(
      <MediaCard title="This is the title" placeholderText="Some placeholder text here">
        <p>Some text here.</p>
      </MediaCard>
    );
    expect(container.queryByText("Some placeholder text here")).not.toBeNull();
  });
});
