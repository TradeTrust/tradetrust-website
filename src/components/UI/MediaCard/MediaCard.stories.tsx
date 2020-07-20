import React from "react";
import { MediaCard, MediaCardUnStyled } from "./MediaCard";

export default {
  title: "UI/MediaCard",
  component: MediaCardUnStyled,
  parameters: {
    componentSubtitle: "MediaCard with youtube embed.",
  },
};

export const MediaCardYoutube = () => {
  return (
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
            Technical/IT dept of shipping lines, shippers, logistics service providers, financial institutions providing
            Trade Financing services, tech companies and platform providers.
          </p>
        </li>
      </ul>
    </MediaCard>
  );
};

export const MediaCardPlaceholderText = () => {
  return (
    <MediaCard title="What is TradeTrust?" placeholderText="Coming soon after 22 Jul 2020">
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
            Technical/IT dept of shipping lines, shippers, logistics service providers, financial institutions providing
            Trade Financing services, tech companies and platform providers.
          </p>
        </li>
      </ul>
    </MediaCard>
  );
};

export const MediaCardDefault = () => {
  return (
    <MediaCard title="What is TradeTrust?">
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
            Technical/IT dept of shipping lines, shippers, logistics service providers, financial institutions providing
            Trade Financing services, tech companies and platform providers.
          </p>
        </li>
      </ul>
    </MediaCard>
  );
};
