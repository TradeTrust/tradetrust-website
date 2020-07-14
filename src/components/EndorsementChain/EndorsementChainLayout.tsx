import React, { FunctionComponent } from "react";
import { format } from "date-fns";
import { TitleEscrowEvent } from "../../types";

interface EndorsementChain {
  endorsementChain: TitleEscrowEvent[];
}

export const EndorsementChain: FunctionComponent<EndorsementChain> = ({ endorsementChain }) => {
  const tableRows: JSX.Element[] = [];
  let index = 0;
  endorsementChain.forEach((beneficiaryChangeEvent) =>
    beneficiaryChangeEvent.holderChangeEvents.forEach((holderChangeEvent) => {
      tableRows.push(
        <tr key={index++}>
          <td>{format(new Date(holderChangeEvent.timestamp), "do MMM yyyy, hh:mm aa")}</td>
          <td>{beneficiaryChangeEvent.beneficiary}</td>
          <td>{holderChangeEvent.holder}</td>
        </tr>
      );
    })
  );
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Beneficiary</th>
          <th>Holder</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export const EndorsementChainError = ({ error }: { error: string }) => {
  return <div>{error}</div>;
};

export const EndorsementChainLoading = () => {
  return <div>Loading Endorsement Chain...</div>;
};

interface EndorsementChainLayout {
  endorsementChain?: TitleEscrowEvent[];
  error?: string;
  pending: boolean;
}

export const EndorsementChainLayout: FunctionComponent<EndorsementChainLayout> = ({
  error,
  pending,
  endorsementChain,
}) => {
  return (
    <div>
      {error && <EndorsementChainError error={error} />}
      {pending && <EndorsementChainLoading />}
      {endorsementChain && <EndorsementChain endorsementChain={endorsementChain} />}
    </div>
  );
};
