import React from "react";
import { Helmet } from "react-helmet";
import { ResourceEvent, EventProps } from "../components/UI/ResourceEvent";
import { ResourceMedia, Media } from "../components/UI/ResourceMedia";
import { importAll } from "../common/utils/importAll";

const medias = importAll(require.context("../../cms/media/", false, /\.md$/)) as Media[];
const events = importAll(require.context("../../cms/event/", false, /\.md$/)) as EventProps[];

// can think on how to reuse sort function
medias.sort((a, b): number => {
  return new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime();
});
events.sort((a, b): number => {
  return new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime();
});

export const MediaPage = () => (
  <>
    <Helmet>
      <meta property="description" content="These are media events which TradeTrust has been involved in." />
      <meta property="og:description" content="These are media events which TradeTrust has been involved in." />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/media`} />
      <title>TradeTrust - Events and Media Centre</title>
    </Helmet>
    <div className="bg-blue-300">
      <div className="container py-12">
        <div className="flex">
          <div className="w-full">
            <h1>Events and Media Centre</h1>
          </div>
        </div>
        <div className="flex flex-wrap py-4 -mx-4">
          <div className="w-full lg:w-4/12 lg:order-2 px-4">
            <ResourceMedia title="Media Centre" medias={medias} />
          </div>
          <div className="w-full lg:w-8/12 lg:order-1 px-4">
            {events.map((event, index) => (
              <ResourceEvent key={index} attributes={event.attributes} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
