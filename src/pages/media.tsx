import React from "react";
import { Helmet } from "react-helmet";
import { ResourceEvent, ResourceEventProps } from "../components/UI/ResourceEvent";
import { ResourceLink } from "../components/UI/ResourceLink";
import { Resource } from "../types";

const pressReleases: Resource[] = [
  {
    title: "Adoption of UNCITRAL model law heralds a quiet revolution in digital trade",
    date: "3 Feb 21",
    url:
      "https://www.businesstimes.com.sg/opinion/adoption-of-uncitral-model-law-heralds-a-quiet-revolution-in-digital-trade ",
  },
  {
    title: "Singapore leading the way in promoting digital trade",
    date: "3 Feb 21",
    url: "https://www.businesstimes.com.sg/opinion/singapore-leading-the-way-in-promoting-digital-trade ",
  },
  {
    title:
      "Electronic Transactions Act Amended To Facilitate Electronic Transactions, Providing Convenience And Strengthening Singapore’s Trade Competitiveness In The Digital Economy",
    date: "1 Feb 21",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2021/Electronic-Transactions-Act-Amended-To-Facilitate-Electronic-Transactions-Providing-Convenience-And-Strengthening-Singapores-Trade-Competitiveness",
  },
  {
    title: "SWIFT and Singapore's IMDA Join Forces to Drive Global Trade Digitalisation",
    date: "5 Oct 2020",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/SWIFT-and-Singapores-IMDA-Join-Forces-to-Drive-Global-Trade-Digitalisation",
  },
  {
    title: "Singapore and Australia Sign Digital Economy Agreement",
    date: "6 Aug 2020",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Signing-of-Singapore-Australia-Digital-Economy-Agreement",
  },
  {
    title: "Singapore Strengthens Digital Collaboration and Linkages with Shenzhen to Create New Market Opportunities",
    date: "18 Jun 2020",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Singapore-Strengthens-Digital-Collaboration-and-Linkages-with-Shenzhen-to-Create-New-Market-Opportunities",
  },
  {
    title: "Singapore, Chile and New Zealand Sign Digital Economy Partnership Agreement Electronically",
    date: "12 Jun 2020",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Singapore-Chile-and-New-Zealand-Sign-Digital-Economy-Partnership-Agreement-Electronically",
  },
  {
    title:
      "Remarks by Mr S Iswaran, Minister for Communications and Information, at the International Chamber of Commerce 'Taking Trade Digital' Forum in Davos on 22 Jan 2020",
    date: "22 Jan 2020",
    url:
      "https://www.mci.gov.sg/pressroom/news-and-stories/pressroom/2020/1/Remarks%20by%20Minister%20S%20Iswaran%20at%20the%20International%20Chamber%20of%20Commerce#.X5gGtAayHwc.gmail",
  },
  {
    title:
      "World's Largest Business Organisation Joins Singapore Government and Major Industry Partners to Drive Global Digitalisation",
    date: "22 Jan 2020",
    url:
      "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Worlds-Largest-Business-Organisation-Joins-Singapore-Government-and-Major-Industry-Partners-to-Drive-Global-Digitalisation",
  },
  {
    title:
      "Launch of TradeTrust announced by Mr S Iswaran, Minister for Communications and Information at the Committee of Supply Debate on 4 March 2019",
    date: "4 Mar 2019",
    url:
      "https://www.mci.gov.sg/pressroom/news-and-stories/pressroom/2019/3/securing-our-future-in-a-digital-age#.X5gFH3jrCCc.gmail",
  },
];

const eventsMedia: ResourceEventProps[] = [
  {
    title: "Digitalise Your Supply Chains to save cost, improve efficiency & Overall Profitability with Trames",
    description:
      "Designed for businesses of all sizes, learn how you can digitise your supply chains to save cost, improve efficiency and overall profitability by using the Trames platform.",
    resource: {
      date: "8 Apr 2021",
      time: "3 - 4pm (GMT+8)",
      eventLink: "https://trames.sg/registration",
    },
  },
  {
    title: "SWIFT Community Event Digitising trade: now or never",
    description:
      "The Covid-19 pandemic has magnified the need for trade digitisation.  With widespread working from home; supply chain; travel, and delivery disruptions; and couriers struggling to get through to lockdown locations in a timely way, there’s never been a greater catalyst to go digital. Watch this session to find out how SWIFT is taking the global trade digitisation effort one step further, in collaboration across the ecosystem.",
    resource: {
      date: "2 Feb 2021",
      eventLink: "https://www.swift.com/news-events/events/watch-on-demand/digitising-trade",
    },
  },
  {
    title: "World CIO 200 APAC Singapore on 3 Dec and World CIO 200 Summit (Grand Finale)",
    description:
      "A presentation on Trade - Adapting to present challenge was delivered at the World CIO 200 Summit 2020. The World CIO 200 Summit 2020 is part of the World CIO 200 Roadshow touring 26 countries celebrating the “Digital Leaders” of today.",
    resource: {
      date: "14 Dec 2020",
      eventLink: "https://globalcioforum.com/cio-200",
      watchLink: "https://vimeo.com/486806411",
    },
  },
  {
    title: "TC307-Plenary",
    description:
      "A TradeTrust update was presented at the recent TC307 Plenary in Nov 2020. The scope of TC307 outlines the standardisation of blockchain technologies and DLT.",
    resource: {
      date: "12 Nov 2020",
      eventLink: "https://www.iso.org/committee/6266604.html",
    },
  },
  {
    title: "Joining forces for trade digitisation: SWIFT, the United Nations, and the Singapore Government",
    description:
      "The Covid-19 pandemic has magnified the need for trade digitisation. With widespread working from home; supply chain, travel, and delivery disruptions; and couriers struggling to get through to lockdown locations in a timely way, there’s never been a greater catalyst to go digital. Watch this session to find out how SWIFT is taking the global trade digitisation effort one step further, in collaborating across the ecosystem.",
    resource: {
      date: "5 Oct 2020",
      time: "4pm - 4.30pm (SGT)",
      eventLink: "https://www.swift.com/swift-at-sibos/joining-forces-trade-digitisation",
    },
  },
  {
    title: "Maritime Perspective Series: Digital Connectivity and Data Standards",
    description:
      "Organised by the Maritime Port Authority of Singapore (MPA), the panel discussed about what the future of global trade with common data standards will look like and what we need to do to get there.",
    resource: {
      date: "28 July 2020",
      time: "4pm - 5pm (SGT)",
      eventLink:
        "https://www.mpa.gov.sg/web/portal/home/maritime-singapore/what-maritime-singapore-offers/maritime-perspectives-webinar-series/digital-connectivity-%26-data-standards",
      watchLink: "https://www.youtube.com/watch?v=-rbi_k-URjw",
    },
  },
  {
    title:
      "SBF Digital Economy Series: Trade Digitalisation - Lowering costs & improving efficiency through paperless trade",
    description:
      "This programme by SBF called on experts from IMDA and existing TradeTrust users to explain how businesses can benefit from TradeTrust.",
    resource: {
      date: "3 July 2020",
      time: "3 - 4pm (SGT)",
      eventLink: "https://www.sbf.org.sg/media-centre/publications-resources/webinars",
      watchLink: "https://www.youtube.com/watch?v=NUTLtLso3-Y",
    },
  },
  {
    title: "Rethink, Retell and Restart",
    description:
      "RosettaNet Singapore and Global CIO Forum, GCF, hosted a webinar that offered insights across industries and countries, for CIOs to think of post-lockdown strategies in different markets.",
    resource: {
      date: "2 July 2020",
      time: "3.30 - 5pm (SGT)",
      eventLink: "https://globalcioforum.com/global-cio-forum-rosettanet-host-websummit-on-post-lockdown-strategies/",
    },
  },
  {
    title: "The Journey to Paperless Trade: Industry Initiatives for Interoperability",
    description:
      "This event by BAFT and R3 explored different blockchain-based digital trade solutions and how global trade participants can use these solutions towards challenges in the global trade ecosystem.",
    resource: {
      date: "2 July 2020",
      time: "9 - 10pm (SGT)",
      eventLink: "https://www.baft.org/baft-education/e-learning/past-webinars",
      watchLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
      eventSlides:
        "https://baft.org/docs/default-source/past-webinars/webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2",
    },
  },
];

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
            <ResourceLink title="Media Centre" resources={pressReleases} />
          </div>
          <div className="w-full lg:w-8/12 lg:order-1 px-4">
            {eventsMedia.map((eventMedia, index) => (
              <ResourceEvent
                title={eventMedia.title}
                description={eventMedia.description}
                resource={eventMedia.resource}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
