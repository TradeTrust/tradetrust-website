import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Pagination, getPaginatedPagesTotal } from "./Pagination";

describe("pagination", () => {
  it("should render pagination component correctly on initial load", () => {
    render(<Pagination totalNoOfPages={8} currentPage={1} setCurrentPage={() => {}} />);

    expect(screen.getAllByTestId(/page-number/)).toHaveLength(4);
    expect(screen.queryAllByTestId("truncate-left")).toHaveLength(0);
    expect(screen.queryAllByTestId("truncate-right")).toHaveLength(1);
    expect(screen.queryAllByTestId("page-prev")).toHaveLength(1);
    expect(screen.queryAllByTestId("page-next")).toHaveLength(1);
  });

  it("should render pagination component correctly despite what the user clicks", () => {
    const setCurrentPage = jest.fn();
    render(<Pagination totalNoOfPages={8} currentPage={2} setCurrentPage={setCurrentPage} />);

    fireEvent.click(screen.getByTestId("page-number-1"));
    fireEvent.click(screen.getByTestId("page-number-2"));
    fireEvent.click(screen.getByTestId("page-number-3"));
    fireEvent.click(screen.getByTestId("page-number-4"));
    fireEvent.click(screen.getByTestId("truncate-right"));
    fireEvent.click(screen.getByTestId("page-number-8"));
    fireEvent.click(screen.getByTestId("page-prev"));
    fireEvent.click(screen.getByTestId("page-next"));
    expect(setCurrentPage).toHaveBeenCalledTimes(7);
  });

  it("should not render left truncate when currentPage is 4", () => {
    render(<Pagination totalNoOfPages={8} currentPage={4} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("truncate-left")).toHaveLength(0);
  });

  it("should render left truncate when currentPage is 5", () => {
    render(<Pagination totalNoOfPages={8} currentPage={5} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("truncate-left")).toHaveLength(1);
  });

  it("should render right truncate when currentPage is 5", () => {
    render(<Pagination totalNoOfPages={10} currentPage={5} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("truncate-right")).toHaveLength(1);
  });

  it("should not render right truncate when currentPage is 7", () => {
    render(<Pagination totalNoOfPages={10} currentPage={7} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("truncate-right")).toHaveLength(0);
  });

  it("should only render first page if totalNoOfPages is 1", () => {
    render(<Pagination totalNoOfPages={1} currentPage={1} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("page-number-1")).toHaveLength(1);
  });

  it("should disable all arrow when totalNoOfPages is 1", () => {
    render(<Pagination totalNoOfPages={1} currentPage={1} setCurrentPage={() => {}} />);

    expect(screen.queryAllByTestId("page-prev")).toHaveLength(1);
    expect(screen.getByTestId("page-prev")).toHaveAttribute("disabled", "");
    expect(screen.queryAllByTestId("page-number-1")).toHaveLength(1);
    expect(screen.getByTestId("page-number-1")).not.toHaveAttribute("disabled");
    expect(screen.queryAllByTestId("page-next")).toHaveLength(1);
    expect(screen.getByTestId("page-next")).toHaveAttribute("disabled", "");
  });

  it("should give correct total pages based on postPerPage", () => {
    const total0 = getPaginatedPagesTotal({ posts: [], postsPerPage: 5 });
    expect(total0).toBe(0);

    const total1 = getPaginatedPagesTotal({
      posts: [{}, {}, {}, {}, {}],
      postsPerPage: 4,
    });
    expect(total1).toBe(2);

    const total2 = getPaginatedPagesTotal({
      posts: [{}, {}, {}, {}, {}],
      postsPerPage: 5,
    });
    expect(total2).toBe(1);

    const total3 = getPaginatedPagesTotal({
      posts: [{}, {}, {}, {}, {}],
      postsPerPage: 6,
    });
    expect(total3).toBe(1);
  });
});
