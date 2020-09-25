import React from "react";
import { Download } from "react-feather";
import { Helmet } from "react-helmet";
import { ResourcesCard } from "../components/UI/ResourcesCard";
import { ResourcesLink } from "../components/UI/ResourcesLink";

const sideLinks = [
  {
    title: "Documentation",
    type: "link",
    details: {
      description: "Browse TradeTrust documentation",
      url: "https://docs.tradetrust.io/",
    },
  },
  {
    title: "Source code",
    type: "link",
    details: {
      description: "View TradeTrust source code",
      url: "https://github.com/TradeTrust/tradetrust-website",
      icon: "/static/images/Github_Octocat.png",
    },
  },
  {
    title: "Newsletter",
    type: "download",
    details: {
      description: "TradeTrust Newsletter Issue 01",
      url: "/static/images/newsletter/TradeTrust_Newsletter_Issue01.pdf",
    },
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

    <div className="bg-blue-lighter">
      <div className="container-custom py-5">
        <div className="row">
          <div className="col-12">
            <h1>Resources</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-12 col-md-12 col-lg-8">
            <ResourcesCard title="TradeTrust Overview" youtubeEmbedCode="NcR1M9NJ-PE" tag="Non-Technical">
              <p>
                This non-technical session helps provide a foundational and critical understanding of TradeTrust as a
                digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end mt-1"
                  href="/static/images/webinar/tradetrust-tech-webinar-1-overview.pdf"
                  download="TradeTrust Tech Webinar 1 - Overview.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 1 - Overview.pdf</span>
                </a>
                <a
                  className="font-weight-bold d-flex align-items-end mt-1"
                  href="/static/images/webinar/tradetrust-tech-webinar-1-demo.pdf"
                  download="TradeTrust Tech Webinar 1 - Demo.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 1 - Demo.pdf</span>
                </a>
              </div>
            </ResourcesCard>

            <ResourcesCard title="Creation of Verifiable Documents" youtubeEmbedCode="Nta_n_G-YqI" tag="Technical">
              <p>
                This Webinar focuses on the creation of verifiable documents. These are documents that do not have the
                functionality of transferring title.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end"
                  href="/static/images/webinar/tradetrust-tech-webinar-2.pdf"
                  download="TradeTrust Tech Webinar 2.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 2.pdf</span>
                </a>
              </div>
            </ResourcesCard>

            <ResourcesCard title="Creation of Transferable Documents" youtubeEmbedCode="4xTyPTyUU_U" tag="Technical">
              <p>
                This segment will focus on the creation of transferable documents. Join this session to learn how to
                create a transferable document and how to perform a title transfer.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end"
                  href="/static/images/webinar/tradetrust-tech-webinar-3.pdf"
                  download="TradeTrust Tech Webinar 3.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 3.pdf</span>
                </a>
              </div>
            </ResourcesCard>

            <ResourcesCard title="Critical Functions of TradeTrust" youtubeEmbedCode="TunHfhOS6uY" tag="Technical">
              <p>
                In this session we will cover critical functions such as reading and verifying a TradeTrust file through
                two types of approaches: a) front-end; and b) programmatically.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end"
                  href="/static/images/webinar/tradetrust-tech-webinar-4.pdf"
                  download="TradeTrust Tech Webinar 4.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 4.pdf</span>
                </a>
              </div>
            </ResourcesCard>

            <ResourcesCard title="Set Up and Change Templates" youtubeEmbedCode="z3l9OSVGHH8" tag="Technical">
              <p>
                Building on sessions 2 and 3, this session will walk you through the steps on how to: configure
                documents; set up schema in a configuration file; and change document templates.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end"
                  href="/static/images/webinar/tradetrust-tech-webinar-5.pdf"
                  download="TradeTrust Tech Webinar 5.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 5.pdf</span>
                </a>
              </div>
            </ResourcesCard>

            <ResourcesCard title="Identity Resolution Services" youtubeEmbedCode="3S1QjgPXn54" tag="Technical">
              <p>
                Identity Resolution in TradeTrust involves the ability to map non-readable identification of issuers to
                a readable form. This segment will cover the methods and the steps on building APIs for identity
                resolution.
              </p>
              <div className="py-2">
                <a
                  className="font-weight-bold d-flex align-items-end"
                  href="/static/images/webinar/tradetrust-tech-webinar-6.pdf"
                  download="TradeTrust Tech Webinar 6.pdf"
                >
                  <Download />
                  <span className="ml-2">TradeTrust Tech Webinar 6.pdf</span>
                </a>
              </div>
            </ResourcesCard>
          </div>
          <div className="col-12 col-md-12 col-lg-4">
            {sideLinks.map((resourceLink, index) => (
              <ResourcesLink
                key={index}
                title={resourceLink.title}
                type={resourceLink.type}
                details={resourceLink.details}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
