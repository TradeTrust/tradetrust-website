import React from "react";

interface NetworkLabelProps {
  networkName: string;
}

export const NetworkLabel = ({ networkName }: NetworkLabelProps) => {
  return (
    <div className="flex-1 flex flex-wrap flex-row md:flex-col gap-2 md:gap-0 items-center md:items-start justify-start">
      <h6>Selected Network:</h6>
      <p data-testid="selected-network">{networkName} Network</p>
    </div>
  );
};
