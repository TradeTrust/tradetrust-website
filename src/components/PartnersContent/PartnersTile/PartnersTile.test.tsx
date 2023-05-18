import { render, screen } from "@testing-library/react";
import React from "react";
import { PartnersTile } from "./PartnersTile";

const data = {
  slug: "abc-company",
  attributes: {
    companyName: "ABC Company",
    description: "Some Company description",
    logo: "/logo",
    websiteLink: "website.com",
  },
};

describe("PartnersTile", () => {
  it("should display the correct element every time, given the partners data", () => {
    render(<PartnersTile data={data} />);

    expect(screen.getByText("ABC Company")).not.toBeNull();
    expect(screen.getByText("Some Company description")).not.toBeNull();
    expect(screen.getByTestId("partner-logo-abc-company")).toHaveAttribute("src", "/logo");
    expect(screen.getByTestId("partner-website-link-abc-company")).toHaveAttribute("href", "website.com");
  });
});
