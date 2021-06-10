import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { OverlayContext, Youtube } from "@govtechsg/tradetrust-ui-components";
import styled from "@emotion/styled";

const Background = styled.div`
  background-image: url("/static/images/home/map.png");

  // @media screen and (min-width: 801px) {
  //   background-image: url("/static/images/home/map.png");
  // }
`;

const DescriptionSection: FunctionComponent = () => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<Youtube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />);
  };
  return (
    <section id="welcome" className="bg-brand-100 h-full text-gray-700 md:pt-16 mb-4">
      <Background className="relative bg-135% bg-right-bottom bg-no-repeat py-16 md:bg-auto md:h-full md:bg-right-top">
        <div className="container md:h-140">
          <div className="md:w-6/12">
            <div className="w-5/5 text-center md:py-8 md:text-left">
              <h1 className="font-ubuntu text-6xl leading-none">A Trust Network for Trading Partners</h1>
              <p className="text-base mb-85% leading-5 py-6 md:w-4/5 md:mb-16">
                A digital utility that comprises a set of globally-accepted standards and frameworks that connects
                governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
                electronic trade documents across digital platforms.
              </p>
              <div className="absolute flex -mt-10% right-0 left-0 justify-center items-center md:relative md:justify-start">
                <div
                  className=" h-12 w-12 transition duration-300 ease-out rounded-full cursor-pointer bg-tangerine flex items-center justify-center hover:bg-tangerine-600"
                  onClick={onOverlayHandler}
                >
                  <i className="fas fa-play text-white" />
                </div>
                <Link
                  to="/verify"
                  className="px-4 py-3 ml-3 bg-cerulean rounded-xl text-white font-bold hover:bg-cerulean-500 hover:text-white "
                >
                  Verify Documents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </section>
  );
};

export const WelcomeSection = DescriptionSection;
