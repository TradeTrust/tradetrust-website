import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useOverlayContext, OverlayContent } from "@govtechsg/tradetrust-ui-components";
import { PersonaProps } from "../../../types";
import { Steps } from "./Steps";
import { ContentType } from "../../../types";
import styled from "@emotion/styled";

const ModalBackground = styled.div`
  background-image: url("/static/images/common/wave-lines-light-2.png");
  background-size: cover;
  margin: 0 -1.25rem;
`;

export const PersonaModal: FunctionComponent<PersonaProps> = ({ personaIndex, details }) => {
  const { setOverlayVisible, showOverlay } = useOverlayContext();
  const [selectedContentType, setSelectedContentType] = useState<ContentType>(ContentType.THEN);
  const contentType: ContentType[] = [ContentType.THEN, ContentType.NOW];
  const handleCloseOverlay = (): void => {
    setOverlayVisible(false);
    showOverlay(undefined);
  };

  const contentTypeFilterStyle = (item: ContentType): string => {
    let returnStyle = "";

    if (item === selectedContentType) returnStyle = "font-bold underline";

    switch (item) {
      case ContentType.THEN:
        return returnStyle + " mr-5";
      default:
        return returnStyle;
    }
  };

  return (
    <section id="persona-modal">
      <OverlayContent title="" className="max-h-9/10 text-white bg-cerulean rounded-xl">
        <ModalBackground className="relative flex flex-col text-white flex p-5 overflow-auto h-auto">
          <div className="flex flex-col justify-center">
            <div className="relative flex justify-center w-full">
              <h3 className="font-normal text-center">{details.learnMore.title}</h3>
              {details.learnMore.thenSteps && details.learnMore.nowSteps && (
                <div className="hidden absolute bottom-0 right-0 lg:block">
                  <div className="flex justify-end">
                    <p>Manual Process</p>
                    <div className="lg:w-8 lg:mt-3 lg:ml-3.5 lg:border-t lg:border-white lg:border-dashed" />
                  </div>
                  <div className="flex justify-end">
                    <p>Digital Process</p>
                    <div className="lg:w-8 lg:mt-3 lg:ml-3.5 lg:border-t lg:border-white lg:border-solid" />
                  </div>
                </div>
              )}
            </div>
            {details.learnMore.startMessage && <h4 className="text-center mt-8">{details.learnMore.startMessage}</h4>}
            {details.learnMore.thenSteps && details.learnMore.nowSteps && (
              <div className="flex flex-row justify-center lg:hidden">
                {contentType.map((content, index) => (
                  <h3
                    key={index}
                    className={`font-normal text-lemon text-center mt-12 ${contentTypeFilterStyle(content)}`}
                    onClick={() => setSelectedContentType(content)}
                  >
                    {content}
                  </h3>
                ))}
              </div>
            )}
            {details.learnMore.thenSteps &&
              details.learnMore.nowSteps &&
              contentType.map((content, index) => (
                <div key={index} className="flex flex-col justify-center">
                  {content === "THEN" && (
                    <div className={`lg:inline ${content === selectedContentType ? "inline" : "hidden"}`}>
                      <Steps contentType={content} stepsDetails={details.learnMore.thenSteps} />
                    </div>
                  )}
                  {content === "NOW" && (
                    <div className={`lg:inline ${content === selectedContentType ? "inline" : "hidden"}`}>
                      <Steps contentType={content} stepsDetails={details.learnMore.nowSteps} />
                    </div>
                  )}
                </div>
              ))}
            {details.learnMore.benefits && (
              <Steps contentType={ContentType.BENEFIT} stepsDetails={details.learnMore.benefits} />
            )}
            <h4 className="text-center mt-8">{details.learnMore.endMessage}</h4>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 mx-auto mt-8 rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
            onClick={handleCloseOverlay}
            data-testid={`get-in-touch-${personaIndex}`}
          >
            <h3 className="font-normal text-2xl">Get in Touch Now</h3>
          </Link>
        </ModalBackground>
      </OverlayContent>
    </section>
  );
};
