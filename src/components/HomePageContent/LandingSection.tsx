import React, { useContext } from "react";
import styled from "@emotion/styled";
import { darken } from "polished";
import { mixin, vars } from "../../styles";
import { Section } from "../Layout/Section";
import { OverlayContext } from "../../common/contexts/OverlayContext";
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
      <div className="row">
        <div className="col-12 col-lg-7 mx-lg-auto col-xl-6">
          <h1 className="mb-4">A Trust Network for Trading Partners</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-5 mx-lg-auto">
          <p>
            A digital utility that comprises a set of globally-accepted standards and frameworks that connects
            governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
            electronic trade documents across digital platforms.
          </p>
          <div className="play mx-auto mt-4" onClick={onOverlayHandler}>
            <i className="fas fa-play" />
          </div>
        </div>
      </div>
    </SectionLanding>
  );
};
