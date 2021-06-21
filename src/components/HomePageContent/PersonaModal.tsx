import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useOverlayContext, OverlayContent } from "@govtechsg/tradetrust-ui-components";
import { DocumentTypeUserProps } from "./HowItWorksSection";

enum ContentType {
  BENEFIT = "BENEFIT",
  THEN = "THEN",
  NOW = "NOW",
}

const StepsComponent: React.FunctionComponent<any> = ({ contentType, stepsDetails }) => {
  const keyValueBorderStyle: { [key: string]: string } = {
    BENEFIT: "border-none",
    THEN: "border-dashed",
    NOW: "border-solid",
  };
  return (
    <div className="flex flex-col justify-center">
      {(contentType === ContentType.THEN || contentType === ContentType.NOW) && (
        <h3 className="hidden text-lemon text-center mt-12 md:inline">{contentType}</h3>
      )}
      <div className="flex flex-row flex-wrap m-auto items-start">
        {stepsDetails.map((steps: any, index: any) => (
          <div key={index} className="flex flex-row w-6/12 mt-6 justify-center md:w-auto">
            <div className="flex flex-col max-w-46 justify-center">
              <img className="max-h-10 min-h-10" src={steps.icon} />
              {steps.stepNumber && <h6 className="text-center mt-4">Step {steps.stepNumber}</h6>}
              <h6 className="font-normal text-center mt-2">{steps.description}</h6>
            </div>
            {index + 1 != stepsDetails.length && (
              <div className={`md:w-48 md:mt-8 md:border-t md:border-white ${keyValueBorderStyle[contentType]}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const PersonaModal: FunctionComponent<DocumentTypeUserProps> = ({ details }) => {
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
      <OverlayContent
        title=""
        // className="relative flex flex-col max-h-120 text-white flex p-5 bg-cerulean rounded-xl shadow-lg overflow-auto h-auto"
        className="max-h-120 text-white bg-cerulean rounded-xl"
      >
        <div
          // className="relative flex flex-col text-white flex p-5 bg-cerulean rounded-xl shadow-lg overflow-auto h-auto"
          className="relative flex flex-col text-white flex p-5 overflow-auto h-auto"
          // style={{ maxHeight: "40rem" }}
        >
          {/* <img className="h-5 w-5 ml-auto" src="/static/images/home/close.svg" onClick={handleCloseOverlay} /> */}

          <div className="flex flex-col justify-center">
            <h4 className="text-center">{details.learnMore.title}</h4>
            {details.learnMore.thenSteps && details.learnMore.nowSteps && (
              <div className="flex flex-row justify-center md:hidden">
                {contentType.map((content, index) => (
                  <h3
                    key={index}
                    // className={`text-lemon text-center mt-12 ${
                    //   content === selectedContentType ? "font-bold underline" : "font-normal "
                    // }`}
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
                    <div className={`md:inline ${content === selectedContentType ? "inline" : "hidden"}`}>
                      <StepsComponent contentType={content} stepsDetails={details.learnMore.thenSteps} />
                    </div>
                  )}
                  {content === "NOW" && (
                    <div className={`md:inline ${content === selectedContentType ? "inline" : "hidden"}`}>
                      <StepsComponent contentType={content} stepsDetails={details.learnMore.nowSteps} />
                    </div>
                  )}
                </div>
              ))}
            {details.learnMore.benefits && (
              <StepsComponent contentType={ContentType.BENEFIT} stepsDetails={details.learnMore.benefits} />
            )}
            <h5 className="text-center mt-6">{details.learnMore.endMessage}</h5>
          </div>
          <Link
            to="/contact"
            className="px-4 py-2 mx-auto mt-5 rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
            onClick={handleCloseOverlay}
          >
            <h4 className="font-ubuntu text-2xl">Get in Touch Now</h4>
          </Link>
        </div>
      </OverlayContent>
    </section>
  );
};

// const StepsComponent: React.FunctionComponent<any> = ({ contentType, stepsDetails }) => {
//   const keyValueBorderStyle: { [key: string]: string } = {
//     BENEFIT: "border-none",
//     THEN: "border-dashed",
//     NOW: "border-solid",
//   };
//   return (
//     <>
//       {(contentType === ContentType.THEN || contentType === ContentType.NOW) && (
//         <h3 className="text-lemon text-center mt-12">{contentType}</h3>
//       )}
//       <div className="flex flex-row m-auto items-start">
//         {stepsDetails.map((steps: any, index: any) => (
//           <div key={index} className="flex flex-row mt-6">
//             <div className="flex flex-col justify-center " style={{ maxWidth: "11.5rem" }}>
//               <img className="max-w-xs max-h-10 min-h-10" src={steps.icon} />
//               {steps.stepNumber && <h6 className="text-center mt-4">Step {steps.stepNumber}</h6>}
//               <h6 className="font-normal text-center mt-2">{steps.description}</h6>
//             </div>
//             {index + 1 != stepsDetails.length && (
//               <div
//                 // className={`w-48 mt-8 border-t border-white ${stepsType === "THEN" ? "border-dashed" : "border-solid"}`}
//                 className={`md:w-48 md:mt-8 md:border-t md:border-white ${keyValueBorderStyle[contentType]}`}
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export const PersonaModal: FunctionComponent<HowItWorksProps> = ({ details }) => {
//   // const [open, setOpen] = useState(-1);
//   const { setOverlayVisible, showOverlay } = useOverlayContext();
//   const handleCloseOverlay = (): void => {
//     setOverlayVisible(false);
//     showOverlay(undefined);
//   };

//   return (
//     <section id="persona-modal">
//       <div
//         className="relative flex flex-col text-white flex p-5 bg-cerulean rounded-xl shadow-lg overflow-auto h-auto"
//         style={{ maxHeight: "40rem" }}
//       >
//         <img className="h-5 w-5 ml-auto" src="/static/images/home/close.svg" onClick={handleCloseOverlay} />

//         <div className="flex flex-col justify-center">
//           <h4 className="text-center">{details.learnMore.title}</h4>
//           {details.learnMore.thenSteps && (
//             <StepsComponent contentType={ContentType.THEN} stepsDetails={details.learnMore.thenSteps} />
//           )}
//           {details.learnMore.nowSteps && (
//             <StepsComponent contentType={ContentType.NOW} stepsDetails={details.learnMore.nowSteps} />
//           )}
//           {details.learnMore.benefits && (
//             <StepsComponent contentType={ContentType.BENEFIT} stepsDetails={details.learnMore.benefits} />
//           )}
//           <h5 className="text-center mt-6">{details.learnMore.endMessage}</h5>
//         </div>
//         <Link
//           to="/contact"
//           // className="flex h-12 min-h-12 w-56 m-auto mt-5 justify-center items-center rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
//           className="px-4 py-2 mx-auto mt-5 rounded-xl text-white bg-tangerine hover:bg-tangerine-600 hover:text-gray-200"
//           onClick={handleCloseOverlay}
//         >
//           <h4 className="font-ubuntu text-2xl">Get in Touch Now</h4>
//         </Link>
//       </div>
//     </section>
//   );
// };
