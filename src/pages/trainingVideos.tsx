import React from "react";
import { Helmet } from "react-helmet";
import { MediaCard } from "../components/UI/MediaCard";

export const TrainingVideosPage = () => (
  <>
    <Helmet>
      <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
      <meta property="og:description" content="Add Tradetrust description" />
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
        <div className="col-12 col-lg-4">
          <MediaCard title="What is TradeTrust?" youtubeEmbedCode="3-ZRuPCa2k4">
            <p>
              This Webinar focuses on the creation of verifiable documents. These are documents that do not have the
              functionality of transferring title.
            </p>
            <p className="mb-0">
              <b>In this session find out how to:</b>
            </p>
            <ul>
              <li>
                <p>Create a verifiable document</p>
              </li>
              <li>
                <p>How to create renderer to read the verifiable document</p>
              </li>
            </ul>
            <p className="mb-0">
              <b>Suitable for:</b>
            </p>
            <ul>
              <li>
                <p>
                  Technical/IT dept of shipping lines, shippers, logistics service providers, financial institutions
                  providing Trade Financing services, tech companies and platform providers.
                </p>
              </li>
            </ul>
          </MediaCard>
        </div>
      </div>
    </div>
  </>
);
