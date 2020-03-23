import React from "react";
import ReactTooltip from "react-tooltip";
import { SvgIcon } from "./../UI/SvgIcon";

interface TokenSideBarTooltipProps {
  id: string;
}

const TokenSideBarTooltip = ({ id }: TokenSideBarTooltipProps) => {
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
      <SvgIcon tooltipId={id} cssClass="feather-info">
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </>
      </SvgIcon>
      <ReactTooltip id={`tooltip-${id}`} place="bottom" type="dark" effect="solid" getContent={getTooltipContent} />
    </>
  );
};

export default TokenSideBarTooltip;
