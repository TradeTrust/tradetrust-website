import { render, screen } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import {
  CERTIFICATE_VIEWER_ERROR_TYPE,
  getRetryLink,
} from "./CertificateViewerErrorBoundary";

const MockRouter = ({ children }: { children: React.ReactNode }) => {
  const history = createMemoryHistory();
  return <Router history={history}>{children}</Router>;
};

describe("CertificateViewerErrorBoundary", () => {
  it("should render home link correctly", () => {
    const retryLink = getRetryLink({
      errorType: CERTIFICATE_VIEWER_ERROR_TYPE.GENERIC,
      recover: () => {},
    });

    render(<MockRouter>{retryLink}</MockRouter>);
    expect(screen.getByText("Homepage")).toBeInTheDocument();
  });

  it("should render retry link for UNSUPPORTED_NETWORK correctly", () => {
    const retryLink = getRetryLink({
      errorType: CERTIFICATE_VIEWER_ERROR_TYPE.UNSUPPORTED_NETWORK,
      recover: () => {},
    });

    render(<MockRouter>{retryLink}</MockRouter>);
    expect(screen.getByText("OK, let's try again!")).toBeInTheDocument();
  });
});
