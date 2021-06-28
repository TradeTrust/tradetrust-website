import React from "react";
import { ContentType } from "../../../types";

export const Steps: React.FunctionComponent<any> = ({ contentType, stepsDetails }) => {
  const keyValueBorderStyle: { [key: string]: string } = {
    BENEFIT: "border-none",
    THEN: "border-dashed",
    NOW: "border-solid",
  };
  return (
    <div className="flex flex-col justify-center">
      {(contentType === ContentType.THEN || contentType === ContentType.NOW) && (
        <h3 className="hidden text-lemon text-center mt-12 lg:inline">{contentType}</h3>
      )}
      <div className="flex flex-wrap m-auto lg:px-16 2xl:px-0 items-start lg:w-full 2xl:max-w-7xl">
        {stepsDetails.map((steps: any, index: any) => (
          <>
            <div key={index} className="flex flex-row flex-none w-6/12 mt-8 justify-center lg:w-auto">
              <div className="flex flex-col max-w-46 min-w-46 justify-center">
                <div className="flex justify-center">
                  <img className="max-h-10 h-10 max-w-12" src={steps.icon} />
                </div>
                {steps.stepNumber && <h6 className="text-center mt-4">Step {steps.stepNumber}</h6>}
                <h6 className="font-normal text-center mt-2">{steps.description}</h6>
              </div>
            </div>
            {index + 1 != stepsDetails.length && (
              <div
                className={`flex-grow lg:-mx-8 lg:mt-14 lg:border-t lg:border-white ${keyValueBorderStyle[contentType]}`}
              />
            )}
          </>
        ))}
      </div>
    </div>
  );
};
