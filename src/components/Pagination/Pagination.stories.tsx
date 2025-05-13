import React, { ReactElement, useState } from "react";
import { Pagination, getPaginatedPagesTotal, getPaginatedPosts } from "./Pagination";
import { PaginationBox } from "./PaginationBox";

export default {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    componentSubtitle: "Pagination",
  },
};

export const SinglePageDefault = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  return <Pagination totalNoOfPages={1} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
};

export const MultiPagesDefault = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  return <Pagination totalNoOfPages={18} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
};

export const PaginationNumberSelected = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <PaginationBox
      pageNumber={1}
      currentPage={currentPage}
      onClick={() => {
        setCurrentPage(1);
      }}
    >
      1
    </PaginationBox>
  );
};

export const PaginationNumberUnselected = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(2);
  return (
    <PaginationBox
      pageNumber={1}
      currentPage={currentPage}
      onClick={() => {
        setCurrentPage(1);
      }}
    >
      1
    </PaginationBox>
  );
};

export const SimpleExample = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const posts = [{ title: "a" }, { title: "b" }, { title: "c" }, { title: "d" }, { title: "e" }, { title: "f" }];
  const paginatedPosts = getPaginatedPosts({
    posts,
    postsPerPage,
    currentPage,
  });
  const totalNoOfPages = getPaginatedPagesTotal({ posts, postsPerPage });

  return (
    <>
      {paginatedPosts.map((post, index) => {
        return <div key={index}>{post.title}</div>;
      })}
      <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};
