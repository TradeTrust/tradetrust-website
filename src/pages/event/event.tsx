import React, { FunctionComponent, useState } from "react";
import { isFuture, isPast } from "date-fns";
import { Helmet } from "react-helmet";
import { ResourceEvent, EventProps } from "../../components/UI/ResourceEvent";
import { Pagination, getPaginatedPosts, getPaginatedPagesTotal } from "@govtechsg/tradetrust-ui-components";
import { Page } from "../../components/Layout/Page";
import { events } from ".";

enum Categories {
  ALL = "All",
  UPCOMING_EVENT = "Upcoming Event",
  PAST_EVENT = "Past Event",
}

export const filterByCategory = (item: string, allEvents: EventProps[]): EventProps[] => {
  switch (true) {
    case item === "Upcoming Event":
      return allEvents.filter((event) => isFuture(new Date(event.attributes.date)));
    case item === "Past Event":
      return allEvents.filter((event) => isPast(new Date(event.attributes.date)));
    default:
      return allEvents;
  }
};

export const EventPage: FunctionComponent = () => {
  const categories: Categories[] = [Categories.ALL, Categories.UPCOMING_EVENT, Categories.PAST_EVENT];
  const [category, setCategory] = useState(Categories.ALL);
  const [filteredPosts, setFilteredPosts] = useState<EventProps[]>(events);

  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedPosts = getPaginatedPosts({ posts: filteredPosts, postsPerPage, currentPage }) as EventProps[];
  const totalNoOfPages = getPaginatedPagesTotal({ posts: filteredPosts, postsPerPage });

  return (
    <>
      <Helmet>
        <meta property="description" content="Check out TradeTrust's upcoming and past events." />
        <meta property="og:description" content="Check out TradeTrust's upcoming and past events." />
        <meta property="og:title" content="TradeTrust - Events" />
        <meta property="og:url" content={`${window.location.origin}/media`} />
        <title>TradeTrust - Events</title>
        <meta
          name="keywords"
          content="Blockchain, NFT, Ethereum, Electronic Trade Document, Verifiable Document, Transferable Documents, Digital Trade Document, SWIFT Community Event, World CIO 200 APAC Singapore, TC307-Plenary, SWIFT at Sibos"
        />
      </Helmet>
      <Page title="Event">
        <div className="mt-2 mb-1">
          {categories.map((item, index) => (
            <h4
              className={`hover:text-cloud-800 inline-block mr-4 cursor-pointer ${
                item === category ? "text-cloud-800" : "text-cloud-300"
              }`}
              key={index}
              data-testid="filter-category"
              onClick={() => {
                setCurrentPage(1);
                setCategory(item);
                setFilteredPosts(filterByCategory(item, events));
              }}
            >
              {item}
            </h4>
          ))}
        </div>
        <div className="flex flex-wrap py-4 -mx-4">
          <div className="w-full px-4 lg:w-9/12">
            {paginatedPosts.map((event, index) => (
              <ResourceEvent key={index} slug={event.slug} attributes={event.attributes} />
            ))}
            {filteredPosts.length > 0 ? (
              <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            ) : (
              <h5 className="font-base font-medium text-cloud-500">There are no events listed right now.</h5>
            )}
          </div>
        </div>
      </Page>
    </>
  );
};
