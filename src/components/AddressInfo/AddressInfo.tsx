import styled from "@emotion/styled";
import { ResolutionResult } from "@govtechsg/address-identity-resolver";
import React, { FunctionComponent } from "react";
import tw from "twin.macro";

interface AddressInfoProps extends ResolutionResult {
  className?: string;
  title: string;
  children: React.ReactNode;
}

export const AddressInfoUnStyled: FunctionComponent<AddressInfoProps> = ({
  className,
  title,
  name,
  resolvedBy,
  source,
  children,
}) => {
  return (
    <div className={`${className}`}>
      <h6>{title}:</h6>
      {name && (
        <div className="flex">
          <h5>{name}</h5>
        </div>
      )}
      <div className="etherum-address w-full">{children}</div>
      {resolvedBy && (
        <div className="flex">
          <span className="info">
            (Resolved by: {resolvedBy}
            {source && `; Source: ${source}`})
          </span>
        </div>
      )}
    </div>
  );
};

export const AddressInfo = styled(AddressInfoUnStyled)`
  h5 {
    ${tw`text-cloud-900 mb-1 font-bold`}
  }

  h6 {
    ${tw`text-cloud-300 text-xl mb-2 font-bold`}
  }

  .info {
    ${tw`text-sm text-cloud-300 font-semibold`}
  }

  .ethereum-address {
    ${tw`inline-block break-all text-cerulean-200`}
  }

  // .etherum-address {
  //   display: inline-block;
  //   word-break: break-all;
  // }
`;
