import styled from "@emotion/styled";
import { darken } from "polished";
import React, { useContext } from "react";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { mixin, vars } from "../../styles";
import { Section } from "../Layout/Section";
import { Youtube } from "./../../components/UI/Overlay/OverlayContent/Youtube";

export const SectionLanding = styled(Section)`
  position: relative;
  ${mixin.centerVertical()}
  min-height: 580px;
  text-align: center;
  background-image: linear-gradient(to right, ${vars.blueLight} 0%, ${vars.pink} 100%);

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
    ${mixin.fontMontserratSemibold}
    ${mixin.fontSize(48)}
  }

  p {
    ${mixin.fontSize(18)}
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
        <div className="w-full lg:w-7/12 xl:w-6/12 lg:mx-auto">
          <h1 className="mb-4">A Trust Network for Trading Partners</h1>
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
