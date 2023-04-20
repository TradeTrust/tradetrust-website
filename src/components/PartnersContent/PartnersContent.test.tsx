import { render, screen } from "@testing-library/react";
import React from "react";
import { TypesOfPartners } from "./types";
import { PartnersContent, getPartnersData } from "./PartnersContent";

const mockData1 = [
  {
    slug: "test-data-1",
    attributes: {
      companyName: "test data 1",
      description: "Some Company description",
      logo: "/logo1",
      typeOfPartner: "Platform",
      websiteLink: "website1.com",
    },
  },
  {
    slug: "test-data-2",
    attributes: {
      companyName: "test data 2",
      description: "Some Company description",
      logo: "/logo2",
      typeOfPartner: "Platform",
      websiteLink: "website2.com",
    },
  },
  {
    slug: "test-data-3",
    attributes: {
      companyName: "test data 3",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Partners",
      websiteLink: "website3.com",
    },
  },
];

const mockData2 = [
  {
    slug: "test-data-1",
    attributes: {
      companyName: "test data 1",
      description: "Some Company description",
      logo: "/logo1",
      typeOfPartner: "Platform",
      websiteLink: "website1.com",
    },
  },
  {
    slug: "test-data-2",
    attributes: {
      companyName: "test data 2",
      description: "Some Company description",
      logo: "/logo2",
      typeOfPartner: "Platform",
      websiteLink: "website2.com",
    },
  },
];

const mockData3 = [
  {
    slug: "test-data-3",
    attributes: {
      companyName: "test data 3",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Partners",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "test-data-4",
    attributes: {
      companyName: "test data 4",
      description: "Some Company description",
      logo: "/logo4",
      typeOfPartner: "Partners",
      websiteLink: "website4.com",
    },
  },
];

const mockData4 = [
  {
    slug: "a",
    attributes: {
      companyName: "a",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Partners",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "y",
    attributes: {
      companyName: "y",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Platform",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "r",
    attributes: {
      companyName: "r",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Partners",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "b",
    attributes: {
      companyName: "b",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Platform",
      websiteLink: "website3.com",
    },
  },
  {
    slug: "c",
    attributes: {
      companyName: "c",
      description: "Some Company description",
      logo: "/logo3",
      typeOfPartner: "Partners",
      websiteLink: "website3.com",
    },
  },
];

describe("PartnersContent", () => {
  it("should render the page correctly, given the partners' data", () => {
    render(<PartnersContent partnersData={mockData1} />);

    expect(screen.getByText("Platform")).not.toBeUndefined;
    expect(screen.getByText("Partners")).not.toBeUndefined;
    expect(screen.getByTestId("partner-logo-test data 1")).not.toBeUndefined;
    expect(screen.getByTestId("partner-logo-test data 2")).not.toBeUndefined;
    expect(screen.queryByTestId("partner-logo-test data 3")).toBeUndefined;
  });

  it("should not render partners selector when there are no partners data", () => {
    render(<PartnersContent partnersData={mockData2} />);

    expect(screen.getByText("Platform")).not.toBeUndefined;
    expect(screen.queryByText("Partners")).toBeNull;
  });

  it("should not render platform selector when there are no platform data", () => {
    render(<PartnersContent partnersData={mockData3} />);

    expect(screen.queryByText("Platform")).toBeUndefined;
    expect(screen.queryByText("Partners")).not.toBeUndefined;
  });
});

describe("getPartnersData", () => {
  it("should return the correct data that is sorted properly when 'partners' is selected", () => {
    expect(getPartnersData(TypesOfPartners.PARTNER, mockData4)).toEqual([
      {
        companyName: "a",
        description: "Some Company description",
        logo: "/logo3",
        typeOfPartner: "Partners",
        websiteLink: "website3.com",
      },
      {
        companyName: "c",
        description: "Some Company description",
        logo: "/logo3",
        typeOfPartner: "Partners",
        websiteLink: "website3.com",
      },
      {
        companyName: "r",
        description: "Some Company description",
        logo: "/logo3",
        typeOfPartner: "Partners",
        websiteLink: "website3.com",
      },
    ]);
  });

  it("should return the correct data that is sorted properly when 'platform' is selected", () => {
    expect(getPartnersData(TypesOfPartners.PLATFORM, mockData4)).toEqual([
      {
        companyName: "b",
        description: "Some Company description",
        logo: "/logo3",
        typeOfPartner: "Platform",
        websiteLink: "website3.com",
      },
      {
        companyName: "y",
        description: "Some Company description",
        logo: "/logo3",
        typeOfPartner: "Platform",
        websiteLink: "website3.com",
      },
    ]);
  });
});
