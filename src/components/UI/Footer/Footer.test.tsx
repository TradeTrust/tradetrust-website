import { render } from "@testing-library/react";
import React from "react";
import { Footer } from "./Footer";
import { FooterColumnItemProps } from "./types";

const renderLabel = ({ label }: FooterColumnItemProps) => <div>{label}</div>;
const renderSomethingElse = ({ to }: FooterColumnItemProps) => <div>{to}</div>;
const renderSpecial = ({ someOther }: FooterColumnItemProps) => <div>{someOther}</div>;
const defaultProps = {
  title: "title",
  legalData: {
    copyright: "copyright",
    items: [{ label: "Terms of use", to: "https://google.com", render: renderLabel }],
  },
};

describe("footer component", () => {
  it("should render the title and copyright if data is null", () => {
    const { getByText } = render(<Footer {...defaultProps} />);
    expect(getByText("title")).toBeInTheDocument();
    expect(getByText("copyright")).toBeInTheDocument();
  });
  it("should render a column of data if an array of array are passed in", () => {
    const data = [
      {
        category: "Category A",
        items: [
          {
            label: "sdfsdf",
            to: "somewhe",
            render: renderSpecial,
            someOther: "A-1",
          },
          { label: "A-2", to: "https://google.com" },
          { label: "A-3", to: "somewhere", render: renderLabel },
        ],
      },
    ];
    const { getByText } = render(<Footer {...defaultProps} data={data} />);
    expect(getByText("A-1")).toBeInTheDocument();
    expect(getByText("A-2")).toBeInTheDocument();
    expect(getByText("A-3")).toBeInTheDocument();
  });
  it("should render columns of data if an array of array are passed in", () => {
    const data = [
      {
        category: "Category A",
        items: [
          {
            label: "sdfsdf",
            to: "somewhe",
            render: renderSpecial,
            someOther: "A-1",
          },
          { label: "A-2", to: "https://google.com" },
          { label: "A-3", to: "somewhere", render: renderLabel },
        ],
      },
      {
        category: "Category B",
        items: [
          { label: "label", to: "B-1", render: renderSomethingElse },
          { label: "B-2", to: "somewhere", render: renderLabel },
        ],
      },
    ];
    const { getByText } = render(<Footer {...defaultProps} data={data} />);
    expect(getByText("Category B")).toBeInTheDocument();
    expect(getByText("A-2")).toBeInTheDocument();
    expect(getByText("B-1")).toBeInTheDocument();
    expect(getByText("B-2")).toBeInTheDocument();
  });

  it("should render footer bottom data if bottom data is passed in", () => {
    const data = [
      {
        category: "Category A",
        items: [
          {
            label: "sdfsdf",
            to: "somewhe",
            render: renderSpecial,
            someOther: "A-1",
          },
          { label: "A-2", to: "https://google.com" },
          { label: "A-3", to: "somewhere", render: renderLabel },
        ],
      },
    ];

    const { getByText } = render(<Footer {...defaultProps} data={data} />);
    expect(getByText("Category A")).toBeInTheDocument();
    expect(getByText("A-2")).toBeInTheDocument();
    expect(getByText("Terms of use")).toBeInTheDocument();
    expect(getByText("copyright")).toBeInTheDocument();
  });
});
