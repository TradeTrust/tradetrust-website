import React, { FunctionComponent } from "react";
import { LoaderSkeleton } from "../../../UI/LoaderSkeleton";

export const EndorsementChainLoading: FunctionComponent = () => {
  const loadingRows = 3;
  return (
    <>
      {[...Array(loadingRows)].map((_item, key) => (
        <div className="flex flex-wrap" key={key}>
          <div className="w-full lg:w-1/4">
            <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
          </div>
          <div className="w-full lg:w-1/4">
            <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
          </div>
          <div className="w-full lg:w-1/4">
            <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
          </div>
          <div className="w-full lg:w-1/4">
            <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
          </div>
        </div>
      ))}
    </>
  );
};
