import React from "react";
import { FunctionComponent } from "react";
import { ErrorBoundary, FallbackComponentType } from "../ErrorBoundary";
import { getCurrentProvider, useProviderContext } from "../../common/contexts/provider";
import { ErrorPage, ErrorPageProps } from "@tradetrust-tt/tradetrust-ui-components";
import { Link } from "react-router-dom";
import { UnsupportedNetworkError } from "../../common/errors";

export enum CERTIFICATE_VIEWER_ERROR_TYPE {
  GENERIC,
  UNSUPPORTED_NETWORK,
  CONTRACT_REVERT,
  RPC_CALL_EXCEPTION,
}

export const CERTIFICATE_VIEWER_ERROR_MESSAGES = {
  [CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC]: {
    title: "Generic error",
    heading: "Something Went Wrong",
    description: "TradeTrust has encountered an issue.",
  },
  [CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK]: {
    title: "Unsupported network",
    heading: "Whoops!",
    description: "Try changing to a correct network for the document.",
  },
  [CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT]: {
    title: "Contract revert",
    heading: "Whoops!",
    description:
      "There might be an issue with the network or contract. Make sure you on the correct network for the document.",
  },
  [CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION]: {
    title: "RPC call exception",
    heading: "Whoops!",
    description: "There might be an issue with the network.",
  },
};

/**
 * Attempts to guess the type of error from the Error object.
 * @param error Error received from boundary
 */
const getErrorType = (error?: Error): CERTIFICATE_VIEWER_ERROR_TYPE => {
  const provider = getCurrentProvider();
  const errorMessage = error?.message;

  if (!errorMessage) {
    return CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC;
  }
  switch (true) {
    case !provider || error instanceof UnsupportedNetworkError:
      return CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK;
    case errorMessage.includes("call revert exception"):
      return CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT;
    case errorMessage.includes("SERVER_ERROR"):
      return CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION; // RPC call may have returned an error. For eg, forbidden, bad request, etc.
    default:
      return CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC;
  }
};

/**
 * Get back retry link with recovery methods accordingly.
 * @param errorType Error type guessed from Error object
 * @param recover Recover method to retry
 */
export const getRetryLink = ({
  errorType,
  recover,
}: {
  errorType: CERTIFICATE_VIEWER_ERROR_TYPE;
  recover: () => void;
}): React.ReactNode => {
  const linkHome = (
    <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-2xl">
      {"Go to "}
      <Link className="text-cerulean-300" to="/">
        Homepage
      </Link>
      ?
    </h3>
  );

  const linkRecover = (
    <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-xl">
      <Link to="#" onClick={recover}>
        {`OK, let's try again!`}
      </Link>
    </h3>
  );

  switch (errorType) {
    case CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK:
      return linkRecover;
    case CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT:
      return linkRecover;
    case CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION:
      return linkRecover;
    default:
      return linkHome;
  }
};

/**
 * Get prepared props to be passed to ErrorPage component from tt-ui.
 * @param errorType Error type guessed from Error object
 */
export const getErrorPageProps = ({ errorType }: { errorType: CERTIFICATE_VIEWER_ERROR_TYPE }): ErrorPageProps => {
  switch (errorType) {
    case CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK:
      return {
        pageTitle: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK].title,
        header: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK].heading,
        description: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK].description,
        image: "/static/images/errorpage/error-boundary.png",
      };
    case CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT:
      return {
        pageTitle: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT].title,
        header: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT].heading,
        description: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.CONTRACT_REVERT].description,
        image: "/static/images/errorpage/error-boundary.png",
      };
    case CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION:
      return {
        pageTitle: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION].title,
        header: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION].heading,
        description: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.RPC_CALL_EXCEPTION].description,
        image: "/static/images/errorpage/error-boundary.png",
      };
    default:
      return {
        pageTitle: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC].title,
        header: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC].heading,
        description: CERTIFICATE_VIEWER_ERROR_MESSAGES[CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC].description,
        image: "/static/images/errorpage/error-boundary.png", // TODO: should make optional in tt-ui, defaults to this image
      };
  }
};

/**
 * Fallback component to show when ErrorBoundary is triggered
 */
const ErrorComponent: FallbackComponentType = (props) => {
  const { error, recover } = props;
  const errorType = getErrorType(error);
  const errorPageProps = getErrorPageProps({ errorType });
  const retryLink = getRetryLink({ errorType, recover });

  return <ErrorPage {...errorPageProps}>{retryLink}</ErrorPage>;
};

/**
 * ErrorBoundary for CertificateViewer component
 */
export const CertificateViewerErrorBoundary: FunctionComponent = (props) => {
  const { children } = props;

  const { reloadNetwork } = useProviderContext();
  const recoverHandler = async () => {
    await reloadNetwork();
  }; // TODO: depending on error type, should recover accordingly. currently only reloads network for all error cases other then CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC

  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} onRecover={recoverHandler}>
      {children}
    </ErrorBoundary>
  );
};
