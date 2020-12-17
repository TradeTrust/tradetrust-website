import React from "react";
import { Helmet } from "react-helmet";
import { ResourcesCard } from "../components/UI/ResourcesCard";
import { ResourcesLink } from "../components/UI/ResourcesLink";
import { ResourcesLinkProps } from "../types";

const sideLinks = [
  {
    title: "Documentation",
    type: "link",
    details: [
      {
        title: "Browse TradeTrust documentation",
        url: "https://docs.tradetrust.io/",
      },
    ],
  },
  {
    title: "Source code",
    type: "link",
    details: [
      {
        title: "View TradeTrust source code",
        url: "https://github.com/TradeTrust/tradetrust-website",
      },
    ],
    icon: "/static/images/Github_Octocat.png",
  },
  {
    title: "Newsletters",
    type: "download",
    details: [
      {
        title: "TradeTrust Newsletter Issue 01",
        url: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
      },
      {
        title: "TradeTrust Newsletter Issue 02",
        url: "/static/images/newsletter/TradeTrust_Newsletter_Issue02.pdf",
      },
    ],
  },
] as ResourcesLinkProps[];

const resources = [
  {
    title: "TradeTrust Overview",
    youtubeEmbedCode: "NcR1M9NJ-PE",
    tag: "Non-Technical",
    description:
      "This non-technical session helps provide a foundational and critical understanding of TradeTrust as a digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 1 - Overview.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-1-overview.pdf",
      },
      {
        fileName: "TradeTrust Tech Webinar 1 - Demo.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-1-demo.pdf",
      },
    ],
  },
  {
    title: "Creation of Verifiable Documents",
    youtubeEmbedCode: "Nta_n_G-YqI",
    tag: "Technical",
    description:
      "This Webinar focuses on the creation of verifiable documents. These are documents that do not have the functionality of transferring title.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 2.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-2.pdf",
      },
    ],
  },
  {
    title: "Creation of Transferable Documents",
    youtubeEmbedCode: "4xTyPTyUU_U",
    tag: "Technical",
    description:
      "This segment will focus on the creation of transferable documents. Join this session to learn how to create a transferable document and how to perform a title transfer.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 3.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-3.pdf",
      },
    ],
  },
  {
    title: "Critical Functions of TradeTrust",
    youtubeEmbedCode: "TunHfhOS6uY",
    tag: "Technical",
    description:
      "In this session we will cover critical functions such as reading and verifying a TradeTrust file through two types of approaches: a) front-end; and b) programmatically.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 4.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-4.pdf",
      },
    ],
  },
  {
    title: "Set Up and Change Templates",
    youtubeEmbedCode: "z3l9OSVGHH8",
    tag: "Technical",
    description:
      "Building on sessions 2 and 3, this session will walk you through the steps on how to: configure documents; set up schema in a configuration file; and change document templates.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 5.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-5.pdf",
      },
    ],
  },
  {
    title: "Identity Resolution Services",
    youtubeEmbedCode: "3S1QjgPXn54",
    tag: "Technical",
    description:
      "Identity Resolution in TradeTrust involves the ability to map non-readable identification of issuers to a readable form. This segment will cover the methods and the steps on building APIs for identity resolution.",
    downloads: [
      {
        fileName: "TradeTrust Tech Webinar 6.pdf",
        path: "/static/images/webinar/tradetrust-tech-webinar-6.pdf",
      },
    ],
  },
];

export const ResourcesPage = () => (
  <>
    <Helmet>
      <meta
        property="description"
        content="This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust as a digital utility for cross border trade."
      />
      <meta
        property="og:description"
        content="This series of tech talks is organised by the Infocomm Media Development Authority of Singapore (IMDA) and GovTech Singapore. It comprises six webinars and aims to provide professionals with knowledge on TradeTrust as a digital utility for cross border trade."
      />
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:url" content={`${window.location.origin}/resources`} />
      <title>TradeTrust - Resources</title>
    </Helmet>

    <div className="bg-blue-300">
      <div className="container py-12">
        <div className="flex">
          <div className="w-full">
            <h1>Resources</h1>
          </div>
        </div>
        <div className="flex flex-wrap py-4 -mx-4">
          <div className="w-full lg:w-4/12 lg:order-2 px-4">
            <div className="lg:sticky lg:top-3">
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
          <div className="w-full lg:w-8/12 lg:order-1 px-4">
            {resources.map((resource, index) => (
              <ResourcesCard details={resource} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
