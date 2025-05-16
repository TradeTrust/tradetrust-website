import React, { FunctionComponent } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { PaginationBox } from "./PaginationBox";

export interface PaginationProps {
  totalNoOfPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

interface GetPaginatedPosts {
  postsPerPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any;
  currentPage: number;
}

interface GetPaginatedPagesTotal {
  postsPerPage: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[];
}

export const getPaginatedPagesTotal = ({ posts, postsPerPage }: GetPaginatedPagesTotal): number => {
  return Math.ceil(posts.length / postsPerPage);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPaginatedPosts = ({
  posts,
  postsPerPage,
  currentPage,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
GetPaginatedPosts): any[] => {
  const indexOfLastEvent = currentPage * postsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - postsPerPage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paginatedPosts = posts.filter((post: any, index: number) => {
    return index >= indexOfFirstEvent && index < indexOfLastEvent ? post : null;
  });

  return paginatedPosts;
};

export const Pagination: FunctionComponent<PaginationProps> = ({ totalNoOfPages, currentPage, setCurrentPage }) => {
  const range = 5; // has to be odd number, so curr active number would be center of range
  const rangeOverflow = ~~(range / 2);
  const hideLeftTruncate = currentPage <= rangeOverflow + 2;
  const hideRightTruncate = currentPage > totalNoOfPages - (rangeOverflow + 2);

  const goPreviousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goNextPage = (): void => {
    if (currentPage < totalNoOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex overflow-x-auto">
      <div className="flex ml-auto items-center justify-center">
        <PaginationBox
          onClick={goPreviousPage}
          disable={currentPage === 1}
          data-testid="page-prev"
          aria-label="Previous Page"
        >
          <ChevronLeft size={14} />
        </PaginationBox>
        <PaginationBox
          currentPage={currentPage}
          pageNumber={1}
          onClick={() => {
            setCurrentPage(1);
          }}
          data-testid={`page-number-${1}`}
        >
          1
        </PaginationBox>
        {!hideLeftTruncate && (
          <PaginationBox data-testid="truncate-left" className="cursor-default">
            ...
          </PaginationBox>
        )}
        {[...Array(totalNoOfPages)].map((value, i) => {
          const pageNumber = i + 1;
          const toHideLeft = pageNumber < currentPage - rangeOverflow;
          const toHideRight = pageNumber > currentPage + rangeOverflow;
          const isFirstOrLastPage = pageNumber === 1 || pageNumber === totalNoOfPages;
          const toHide = toHideLeft || toHideRight || isFirstOrLastPage;
          if (toHide) return null;
          return (
            <PaginationBox
              key={i}
              currentPage={currentPage}
              pageNumber={pageNumber}
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
              data-testid={`page-number-${pageNumber}`}
            >
              {pageNumber}
            </PaginationBox>
          );
        })}
        {!hideRightTruncate && (
          <PaginationBox data-testid="truncate-right" className="cursor-default">
            ...
          </PaginationBox>
        )}
        {totalNoOfPages > 1 && (
          <PaginationBox
            currentPage={currentPage}
            pageNumber={totalNoOfPages}
            onClick={() => {
              setCurrentPage(totalNoOfPages);
            }}
            data-testid={`page-number-${totalNoOfPages}`}
          >
            {totalNoOfPages}
          </PaginationBox>
        )}
        <PaginationBox
          onClick={goNextPage}
          disable={currentPage >= totalNoOfPages}
          data-testid="page-next"
          aria-label="Next Page"
        >
          <ChevronRight size={14} />
        </PaginationBox>
      </div>
    </div>
  );
};
