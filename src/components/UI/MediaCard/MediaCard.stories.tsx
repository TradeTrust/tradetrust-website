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
    </MediaCard>
  );
};
