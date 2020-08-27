import React from "react";
import { Helmet } from "react-helmet";
import { MediaCard } from "../components/UI/MediaCard";
import { AttachmentLink } from "./../components/UI/AttachmentLink";

export const TrainingVideosPage = () => (
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
      <meta property="og:url" content={`${window.location.origin}/training-videos`} />
      <title>TradeTrust - Training Videos</title>
    </Helmet>
    <div className="container-custom py-5">
      <div className="row">
        <div className="col-12">
          <h1>Training Videos</h1>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="TradeTrust Overview" youtubeEmbedCode="NcR1M9NJ-PE">
            <p>
              This non-technical session helps provide a foundational and critical understanding of TradeTrust as a
              digital utility as well as the mental framing necessary as a pre-requisite for subsequent webinars.
            </p>
            <div className="py-2">
              <AttachmentLink
                className="mb-3"
                filename="TradeTrust Tech Webinar 1 - Overview.pdf"
                path="/static/images/webinar/tradetrust-tech-webinar-1-overview.pdf"
              />
              <AttachmentLink
                filename="TradeTrust Tech Webinar 1 - Demo.pdf"
                path="/static/images/webinar/tradetrust-tech-webinar-1-demo.pdf"
              />
            </div>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Creation of Verifiable Documents" youtubeEmbedCode="Nta_n_G-YqI">
            <p>
              This Webinar focuses on the creation of verifiable documents. These are documents that do not have the
              functionality of transferring title.
            </p>
            <div className="py-2">
              <AttachmentLink
                filename="TradeTrust Tech Webinar 2.pdf"
                path="/static/images/webinar/tradetrust-tech-webinar-2.pdf"
              />
            </div>
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Creation of Transferable Documents" youtubeEmbedCode="4xTyPTyUU_U">
            <p>
              This segment will focus on the creation of transferable documents. Join this session to learn how to
              create a transferable document and how to perform a title transfer.
            </p>
            <AttachmentLink
              filename="TradeTrust Tech Webinar 3.pdf"
              path="/static/images/webinar/tradetrust-tech-webinar-3.pdf"
            />
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Critical Functions of TradeTrust" youtubeEmbedCode="TunHfhOS6uY">
            <p>
              In this session we will cover critical functions such as reading and verifying a TradeTrust file through
              two types of approaches: a) front-end; and b) programmatically.
            </p>
            <AttachmentLink
              filename="TradeTrust Tech Webinar 4.pdf"
              path="/static/images/webinar/tradetrust-tech-webinar-4.pdf"
            />
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Set Up and Change Templates" youtubeEmbedCode="z3l9OSVGHH8">
            <p>
              Building on sessions 2 and 3, this session will walk you through the steps on how to: configure documents;
              set up schema in a configuration file; and change document templates.
            </p>
            <AttachmentLink
              filename="TradeTrust Tech Webinar 5.pdf"
              path="/static/images/webinar/tradetrust-tech-webinar-5.pdf"
            />
          </MediaCard>
        </div>
        <div className="col-12 col-lg-4 mb-4">
          <MediaCard title="Identity Resolution Services" youtubeEmbedCode="_nt-l-09vMw">
            <p>
              Identity Resolution in TradeTrust involves the ability to map non-readable identification of issuers to a
              readable form. This segment will cover the methods and the steps on building APIs for identity resolution.
            </p>
            <AttachmentLink
              filename="TradeTrust Tech Webinar 6.pdf"
              path="/static/images/webinar/tradetrust-tech-webinar-6.pdf"
            />
          </MediaCard>
        </div>
      </div>
    </div>
  </>
);
