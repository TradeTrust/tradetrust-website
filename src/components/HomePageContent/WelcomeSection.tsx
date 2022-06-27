import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { OverlayContext, Youtube } from "@govtechsg/tradetrust-ui-components";

const DescriptionSection: FunctionComponent = () => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<Youtube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />);
  };
  return (
    <section id="welcome" className="bg-cerulean-50 h-full md:pt-16 mb-4">
      <div
        className="relative bg-[length:135%] bg-right-bottom bg-no-repeat py-16 md:bg-auto md:h-full md:bg-right-top"
        style={{ backgroundImage: "url('/static/images/home/welcome/map.png')" }}
      >
        <div className="container md:h-[35rem]">
          <div className="md:w-6/12">
            <div className="w-5/5 text-center md:py-8 md:text-left">
              <h1 className="font-ubuntu text-6xl leading-none">A Trust Network for Trading Partners</h1>
              <p className="text-base mb-[85%] leading-5 py-6 md:w-4/5 md:mb-16">
                A digital utility that comprises a set of globally-accepted standards and frameworks that connects
                governments and businesses to a public blockchain to enable trusted interoperability and exchanges of
                electronic trade documents across digital platforms.
              </p>
              <div className="absolute flex -mt-[10%] right-0 left-0 justify-center items-center md:relative md:justify-start">
                <div
                  className=" h-12 w-12 transition duration-300 ease-out rounded-full cursor-pointer bg-tangerine-500 flex items-center justify-center hover:bg-tangerine-800"
                  onClick={onOverlayHandler}
                  data-testid="play-button"
                >
                  <i className="fas fa-play text-white" />
                </div>
                <Link
                  to="/verify"
                  className="px-4 py-3 ml-3 bg-cerulean-500 rounded-xl text-white hover:bg-cerulean-800 hover:text-white "
                  data-testid="verify-button"
                >
                  <h4>Verify Documents</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WelcomeSection = DescriptionSection;
