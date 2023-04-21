import { render, screen } from "@testing-library/react";
import React from "react";
import { PartnersContent, sortPartnersData } from "./PartnersContent";

const mockData = [
  {
    slug: "a",
    attributes: {
      companyName: "a",
      description: "Some Company description",
      logo: "/logo3",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "y",
    attributes: {
      companyName: "y",
      description: "Some Company description",
      logo: "/logo3",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "r",
    attributes: {
      companyName: "r",
      description: "Some Company description",
      logo: "/logo3",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "b",
    attributes: {
      companyName: "b",
      description: "Some Company description",
      logo: "/logo3",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "c",
    attributes: {
      companyName: "c",
      description: "Some Company description",
      logo: "/logo3",
      websiteLink: "website3.com",
    },
  },
];

describe("PartnersContent", () => {
  it("should render the page correctly, given the partners' data", () => {
    render(<PartnersContent partnersData={mockData} />);

    expect(screen.getByTestId("partner-logo-a")).not.toBeUndefined();
    expect(screen.getByTestId("partner-logo-b")).not.toBeUndefined();
    expect(screen.queryByTestId("partner-logo-c")).not.toBeUndefined();
  });
});

describe("getPartnersData", () => {
  it("should return the correct data that is sorted properly", () => {
    expect(sortPartnersData(mockData)).toEqual([
      {
        slug: "a",
        attributes: {
          companyName: "a",
          description: "Some Company description",
          logo: "/logo3",
          websiteLink: "website3.com",
        },
      },
      {
        slug: "b",
        attributes: {
          companyName: "b",
          description: "Some Company description",
          logo: "/logo3",
          websiteLink: "website3.com",
        },
      },
      {
        slug: "c",
        attributes: {
          companyName: "c",
          description: "Some Company description",
          logo: "/logo3",
          websiteLink: "website3.com",
        },
      },
      {
        slug: "r",
        attributes: {
          companyName: "r",
          description: "Some Company description",
          logo: "/logo3",
          websiteLink: "website3.com",
        },
      },
      {
        slug: "y",
        attributes: {
          companyName: "y",
          description: "Some Company description",
          logo: "/logo3",
          websiteLink: "website3.com",
        },
      },
    ]);
  });
});
