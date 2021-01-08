import React, { FunctionComponent } from "react";
import { AlertTriangle } from "react-feather";

interface EndorsementChainErrorProps {
  error?: string;
}

export const EndorsementChainError: FunctionComponent<EndorsementChainErrorProps> = ({ error }) => {
  return (
    <tr>
      <td className="mb-6 p-0 border-t-0" role="cell" colSpan={3}>
        <div className="flex flex-col items-center justify-center h-48 bg-white">
          <div className="flex">
            <AlertTriangle className="mr-2 text-red" />
            <div className="text-grey-700 font-bold text-lg">An error occurred, please try again later.</div>
          </div>
          <div className="text-grey-700 font-bold text-lg text-center">{error}</div>
        </div>
      </td>
    </tr>
  );
};
