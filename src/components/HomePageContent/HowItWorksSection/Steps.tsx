import React, { FunctionComponent } from "react";
import { StepDetail, StepsProps, ContentType } from "./types";

const Step: FunctionComponent<StepDetail> = (props) => {
  const { icon, title, description } = props;
  return (
    <div className={`flex flex-row flex-none w-full xs:w-1/2 lg:w-auto mt-8 justify-center  ${icon ? "" : "lg:ml-8"}`}>
      <div className="flex flex-col max-w-[11.5rem] min-w-[10rem] justify-center">
        {icon && (
          <div className="flex justify-center">
            <img className="max-h-10 h-10 max-w-[3rem]" src={icon} />
          </div>
        )}
        {title && <h5 className={`text-center ${icon ? "mt-4" : "mt-0"}`}>{title}</h5>}
        <h6
          className={`font-normal text-center mt-2 px-4 lg:px-0 lg:-mx-6 ${
            icon ? "font-gilroy-medium" : "font-ubuntu text-2xl"
          }`}
        >
          {description}
        </h6>
      </div>
    </div>
  );
};

export const Steps: React.FunctionComponent<StepsProps> = ({ contentType, stepsDetails }) => {
  const getBorderStyle = {
    BENEFIT: "border-none",
    THEN: "border-dashed",
    NOW: "border-solid",
  };

  return (
    <div className="flex flex-col justify-center">
      {contentType !== ContentType.BENEFIT && (
        <h3 className="hidden text-lemon-500 text-center mt-12 lg:inline">{contentType}</h3>
      )}
      <div className="flex flex-wrap m-auto 2xl:px-0 items-start lg:w-full 2xl:max-w-7xl">
        {stepsDetails.map((stepDetail: StepDetail, index: number) => (
          <React.Fragment key={index}>
            <Step {...stepDetail} />
            {index + 1 != stepsDetails.length && (
              <div
                className={`flex-grow lg:-mx-8 lg:mt-14 lg:border-t lg:border-white ${getBorderStyle[contentType]}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
