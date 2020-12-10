import styled from "@emotion/styled";
import { OverlayContext, Youtube } from "@govtechsg/tradetrust-ui-components";
import React, { useContext } from "react";
import tw from "twin.macro";
import { mixin } from "../../styles";
import { Section } from "../Layout/Section";

export const SectionLanding = styled(Section)`
  min-height: 580px;

  &::before {
    ${tw`absolute top-0 left-0 w-full h-full bg-no-repeat pointer-events-none`}
    content: "";
    background-image: url("/static/images/landingsection/graphic-landing.png");
    background-size: 940px auto;
    background-position: center bottom;
    opacity: 0.4;
  }

  .play {
    ${tw`transition duration-300 ease-out rounded-full cursor-pointer bg-blue`}
    ${mixin.centerVertical()}
    width: 60px;
    height: 60px;

    &:hover {
      ${tw`bg-blue-800`}
    }

    .fa-play {
      ${tw`text-2xl text-pink`}

      &::before {
        ${tw`ml-1`}
      }
    }
  }
`;

export const LandingSection = () => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<Youtube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />);
  };

  return (
    <SectionLanding
      className="relative flex flex-col justify-center text-center bg-gradient-to-r from-blue-400 to-pink"
      id="about"
    >
      <div className="flex">
        <div className="w-full lg:w-7/12 xl:w-5/12 lg:mx-auto">
          <h1 className="mb-4" style={{ fontSize: "48px" }}>
            A Trust Network for Trading Partners
          </h1>
          <p>
            A digital utility that comprises a set of globally-accepted standards and frameworks that connects
            governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
            electronic trade documents across digital platforms.
          </p>
          <div className="play mx-auto mt-6" onClick={onOverlayHandler}>
            <i className="fas fa-play" />
          </div>
        </div>
      </div>
    </SectionLanding>
  );
};
