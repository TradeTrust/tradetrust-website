import React from "react";
import { CostHeader } from "../CostHeader";
import { CostOperation } from "../CostOperation";
import { OpenSourceSoftware } from "../OpenSourceSoftware";
import { render, screen } from "@testing-library/react";

describe("CostHeader", () => {
  it("should render CostHeader component correctly", () => {
    render(<CostHeader />);

    expect(screen.getByText(/TradeTrust is free to use for all,/)).toBeInTheDocument();
  });
});

describe("OpenSourceSoftware", () => {
  it("should render OpenSourceSoftware component correctly", () => {
    render(<OpenSourceSoftware />);

    expect(screen.getByText(/Open-Source Software/)).toBeInTheDocument();
    expect(screen.getByText(/TradeTrust's open-source code can be downloaded for free from/)).toBeInTheDocument();
    expect(screen.getByText(/Singapore's 2021 amendment of its Electronic Transactions Act/)).toBeInTheDocument();
  });
});

describe("CostOperation", () => {
  it("should render CostOperation component correctly", () => {
    render(<CostOperation />);

    expect(screen.getByText(/Cost of Operation - Transferable Documents/)).toBeInTheDocument();
  });
});
