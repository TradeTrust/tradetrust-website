import styled from "@emotion/styled";
import { OverlayContext, Youtube } from "@govtechsg/tradetrust-ui-components";
import { darken } from "polished";
import React, { useContext } from "react";
import tw from "twin.macro";
import { mixin, vars } from "../../styles";
import { Section } from "../Layout/Section";

export const SectionLanding = styled(Section)`
  ${tw`relative flex flex-col justify-center text-center bg-gradient-to-r from-blue-300 to-pink`}
  min-height: 580px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/static/images/landingsection/graphic-landing.png");
    background-size: 940px auto;
    background-repeat: no-repeat;
    background-position: center bottom;
    opacity: 0.4;
    pointer-events: none;
  }

  h1 {
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
  }

  .play {
    transition: background-color 0.3s ${vars.easeOutCubic};
    ${mixin.centerVertical()}
    width: 60px;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${vars.brandBlue};

    &:hover {
      background-color: ${darken(0.1, vars.brandBlue)};
    }

    .fa-play {
      ${mixin.fontSize(24)}
      color: ${vars.pink};

      &::before {
        margin-left: 4px;
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
    <SectionLanding id="about">
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
