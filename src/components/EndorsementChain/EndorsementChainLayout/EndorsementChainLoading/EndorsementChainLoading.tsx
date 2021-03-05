import React, { FunctionComponent } from "react";
import { LoaderSkeleton } from "../../../UI/LoaderSkeleton";

export const EndorsementChainLoading: FunctionComponent = () => {
  return (
    <>
      <tr className="table-row">
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
      </tr>
      <tr className="table-row">
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
        <td className="mb-6 p-0 border-t-0" role="cell">
          <LoaderSkeleton className="m-2" data-testid="loader-skeleton" />
        </td>
      </tr>
    </>
  );
};
