import React, { FunctionComponent } from "react";
import { LoaderSkeleton } from "../../../UI/Loader";

export const EndorsementChainLoading: FunctionComponent = () => {
  return (
    <>
      <tr className="table-row">
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
        <td className="mb-6 loading-cell" role="cell">
          <LoaderSkeleton className="m-2" role="loaderSkeleton" />
        </td>
      </tr>
    </>
  );
};
