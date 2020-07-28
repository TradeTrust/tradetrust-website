import React, { FunctionComponent } from "react";
import { LoaderSkeleton } from "../../../UI/Loader";

export const EndorsementChainLoading: FunctionComponent = () => {
  return (
    <>
      <div className="table-row">
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
      </div>
      <div className="table-row">
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
      </div>
      <div className="table-row">
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
        <div className="mb-4" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </div>
      </div>
    </>
  );
};
