import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Carousel } from "./Carousel";

const sampleData = [
  {
    title: "Foo",
    description: "Foo description here.",
  },
  {
    title: "Bar",
    description: "Bar description here.",
  },
];

const sampleData2 = [
  ...sampleData,
  {
    title: "Foobar",
    subheader: "Foobar subheader here.",
    description: "Foobar description here.",
    buttonYoutube: {
      youtubeId: "abcdefge",
    },
    buttonPage: {
      route: "/verify",
      label: "Verify Documents",
    },
    buttonDownload: {
      label: "Download Now",
      file: "/static/uploads/document.pdf",
    },
    backgroundImage: "/static/uploads/bg-image.png",
  },
];

describe("Carousel", () => {
  it("should render basic carousel correctly", () => {
    render(
      <Router>
        <Carousel slides={sampleData as any} />
      </Router>
    );
    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText("Bar")).toBeInTheDocument();
    expect(screen.getByText("Foo description here.")).toBeInTheDocument();
    expect(screen.getByText("Bar description here.")).toBeInTheDocument();
    expect(screen.getAllByTestId("slide").length).toEqual(2);
  });

  it("should render complex carousel correctly", () => {
    render(
      <Router>
        <Carousel slides={sampleData2 as any} />
      </Router>
    );
    expect(screen.getByText("Foobar subheader here.")).toBeInTheDocument();
    expect(screen.getByText("Verify Documents")).toBeInTheDocument();
    expect(screen.getByText("Download Now")).toBeInTheDocument();
    expect(screen.getAllByTestId("slide").length).toEqual(3);
  });
});
