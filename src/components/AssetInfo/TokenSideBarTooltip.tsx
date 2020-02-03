import React from "react";
import ReactTooltip from "react-tooltip";

interface TokenSideBarTooltipProps {
  id: string;
  isEndorseChangeOfBeneAwaiting?: boolean;
}

const TokenSideBarTooltip = ({ id, isEndorseChangeOfBeneAwaiting }: TokenSideBarTooltipProps) => {
  const getTooltipContent = () => {
    switch (id) {
      case "transferholdership":
        return (
          <p>
            Holdership in <b>TradeTrust</b> is similar to physical possession of a <b>Bill of Lading</b>.
          </p>
        );
      case "changebeneficiary":
        return (
          <p>
            Giving up legal ownserhip of the goods to the endorsed beneficiary indicated in <b>Bill of Lading</b>.
          </p>
        );
      case "surrenderdocument":
        return (
          <p>
            Return this <b>Bill of Lading</b> to the Shipping Line.
          </p>
        );
      case "approvechangebeneficiary":
        return <p>Allow holder to execute change of beneficiary to the input specified address.</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <svg
        data-tip
        data-for={`tooltip-${id}`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-info"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <ReactTooltip id={`tooltip-${id}`} place="bottom" type="dark" effect="solid" getContent={getTooltipContent} />
      {id === "changebeneficiary" && isEndorseChangeOfBeneAwaiting && (
        <>
          <svg
            data-tip
            data-for="tooltip-alert"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-triangle"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <ReactTooltip
            id="tooltip-alert"
            place="bottom"
            type="dark"
            effect="solid"
            getContent={() => <p>Endorsement awaiting</p>}
          />
        </>
      )}
    </>
  );
};

export default TokenSideBarTooltip;
