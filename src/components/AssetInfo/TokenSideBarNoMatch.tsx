import React, { ReactElement } from "react";

interface ErrorType {
  accessDenied: boolean;
  networkMismatch: boolean;
  metamaskNotFound: boolean;
}

const getErrorMessage = (errorType: ErrorType) => {
  if (errorType.metamaskNotFound) return "Metamask not found.";
  else if (errorType.networkMismatch)
    return "Metamask network is different than website network. Please change the metamask network.";
  else if (errorType.accessDenied) return "It seems that you do not have access to manage assets.";
  else return null;
};

const TokenSideBarNoMatch = ({ errorType, children }: { errorType: ErrorType; children: ReactElement }) => {
  const errorMessage = getErrorMessage(errorType);

  return errorMessage ? (
    <>
      <h4>Oops!</h4>
      <p>{errorMessage}</p>
    </>
  ) : (
    children
  );
};

export default TokenSideBarNoMatch;
