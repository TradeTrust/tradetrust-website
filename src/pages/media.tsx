import styled from "@emotion/styled";
import React from "react";
import { Helmet } from "react-helmet";
import { ResourcesCard } from "../components/UI/ResourcesCard";
import { ResourcesLink } from "../components/UI/ResourcesLink";
import { vars } from "../styles";
import { ResourcesLinkProps } from "../types";

const sideLinks = [
  {
    title: "Media Centre",
    type: "link",
    details: [
      {
        title:
          "Launch of TradeTrust announced by Mr S Iswaran, Minister for Communications and Information at the Committee of Supply Debate on 4 March 2019",
        date: "4 Mar 2019",
        url:
          "https://www.mci.gov.sg/pressroom/news-and-stories/pressroom/2019/3/securing-our-future-in-a-digital-age#.X5gFH3jrCCc.gmail",
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
          "Remarks by Mr S Iswaran, Minister for Communications and Information, at the International Chamber of Commerce 'Taking Trade Digital' Forum in Davos on 22 Jan 2020",
        date: "22 Jan 2020",
        url:
          "https://www.mci.gov.sg/pressroom/news-and-stories/pressroom/2020/1/Remarks%20by%20Minister%20S%20Iswaran%20at%20the%20International%20Chamber%20of%20Commerce#.X5gGtAayHwc.gmail",
      },
      {
        title: "Singapore, Chile and New Zealand Sign Digital Economy Partnership Agreement Electronically",
        date: "12 Jun 2020",
        url:
          "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Singapore-Chile-and-New-Zealand-Sign-Digital-Economy-Partnership-Agreement-Electronically",
      },
      {
        title:
          "Singapore Strengthens Digital Collaboration and Linkages with Shenzhen to Create New Market Opportunities",
        date: "18 Jun 2020",
        url:
          "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Singapore-Strengthens-Digital-Collaboration-and-Linkages-with-Shenzhen-to-Create-New-Market-Opportunities",
      },
      {
        title: "Singapore and Australia Sign Digital Economy Agreement",
        date: "6 Aug 2020",
        url:
          "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Signing-of-Singapore-Australia-Digital-Economy-Agreement",
      },
      {
        title: "SWIFT and Singapore's IMDA Join Forces to Drive Global Trade Digitalisation",
        date: "5 Oct 2020",
        url:
          "https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/SWIFT-and-Singapores-IMDA-Join-Forces-to-Drive-Global-Trade-Digitalisation",
      },
    ],
  },
] as ResourcesLinkProps[];

const resources = [
  {
    title: "The Journey to Paperless Trade: Industry Initiatives for Interoperability",
    dateTime: "2 July | 9-10pm SGT",
    description:
      "This event by BAFT and R3 explored different blockchain-based digital trade solutions and how global trade participants can use these solutions towards challenges in the global trade ecosystem.",
    watchLink: "https://www.youtube.com/watch?v=iRmaQV9HERw",
    eventLink: "https://www.baft.org/baft-education/e-learning/past-webinars",
    eventSlides:
      "https://baft.org/docs/default-source/past-webinars/webinar-the-journey-to-paperless-trade.pdf?sfvrsn=6e9a20e1_2",
  },
  {
    title: "Rethink, Retell and Restart",
    dateTime: "2 July | 3.30-5pm SGT",
    description:
      "RosettaNet Singapore and Global CIO Forum, GCF, hosted a webinar that offered insights across industries and countries, for CIOs to think of post-lockdown strategies in different markets.",
    eventLink: "https://globalcioforum.com/global-cio-forum-rosettanet-host-websummit-on-post-lockdown-strategies/",
  },
  {
    title:
      "SBF Digital Economy Series: Trade Digitalisation - Lowering costs & improving efficiency through paperless trade",
    dateTime: "3 July | 3-4pm SGT",
    description:
      "This programme by SBF called on experts from IMDA and existing TradeTrust users to explain how businesses can benefit from TradeTrust.",
    watchLink: "https://www.youtube.com/watch?v=NUTLtLso3-Y&feature=youtu.be",
    eventLink: "https://www.sbf.org.sg/media-centre/publications-resources/webinars",
  },
  {
    title: "Maritime Perspective Series: Digital Connectivity and Data Standards",
    dateTime: "28 July | 4pm-5pm SGT",
    description:
      "Organised by the Maritime Port Authority of Singapore (MPA), the panel discussed about what the future of global trade with common data standards will look like and what we need to do to get there.",
    eventLink:
      "https://www.mpa.gov.sg/web/portal/home/maritime-singapore/what-maritime-singapore-offers/maritime-perspectives-webinar-series/digital-connectivity-%26-data-standards",
    watchLink: "https://www.youtube.com/watch?v=-rbi_k-URjw&feature=youtu.be",
  },
  {
    title: "Joining forces for trade digitisation: SWIFT, the United Nations, and the Singapore Government",
    dateTime: "5 Oct | 4pm - 4.30pm SGT",
    description:
      "The Covid-19 pandemic has magnified the need for trade digitisation. With widespread working from home; supply chain, travel, and delivery disruptions; and couriers struggling to get through to lockdown locations in a timely way, there’s never been a greater catalyst to go digital. Watch this session to find out how SWIFT is taking the global trade digitisation effort one step further, in collaborating across the ecosystem.",
    watchLink: "https://www.swift.com/swift-at-sibos/joining-forces-trade-digitisation",
    eventLink: "https://www.swift.com/swift-at-sibos/joining-forces-trade-digitisation",
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

    <ResourcePageStyle>
      <div className="bg-blue-lighter">
        <div className="container py-12">
          <div className="flex">
            <div className="w-full">
              <h1>Events and Media Centre</h1>
            </div>
          </div>
          <div className="flex flex-wrap py-4">
            <div className="w-full lg:w-4/12 lg:order-2">
              <div className="side-links">
                {sideLinks.map((resourceLink, index) => (
                  <ResourcesLink
                    key={index}
                    title={resourceLink.title}
                    type={resourceLink.type}
                    details={resourceLink.details}
                    icon={resourceLink.icon}
                  />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-8/12 lg:order-1">
              {resources.map((resource, index) => (
                <ResourcesCard details={resource} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ResourcePageStyle>
  </>
);

const ResourcePageStyle = styled.div`
  .side-links {
    @media (min-width: ${vars.lg}) {
      top: 10px;
    }
  }
`;
