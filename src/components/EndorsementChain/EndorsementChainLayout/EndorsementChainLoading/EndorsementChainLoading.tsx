import React, { FunctionComponent } from "react";
import { LoaderSkeleton } from "../../../UI/Loader";

export const EndorsementChainLoading: FunctionComponent = () => {
  return (
    <>
      <tr className="table-row">
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
        <td className="mb-4 loading-cell" role="loaderSkeleton">
          <LoaderSkeleton className="m-2" />
        </td>
      </tr>
    </>
  );
};
