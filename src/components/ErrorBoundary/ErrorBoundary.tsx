import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import React, { Component, ReactNode } from "react";
import Link from "next/link";
import { getLogger } from "../../utils/logger";

const { stack } = getLogger("component:errorBoundary");

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Record<string, unknown>, ErrorBoundaryState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    stack(error);
  }

  render(): ReactNode {
    const error = this.state.error;
    const description = error?.message ? error.message : "TradeTrust has encountered an issue.";
    return this.state.hasError ? (
      <ErrorPage
        pageTitle="ERROR"
        header="Something Went Wrong"
        description={description}
        image="/static/images/errorpage/error-boundary.png"
      >
        <h3 className="font-normal my-2 sm:my-4 text-lg sm:text-2xl">
          Go to
          <Link className="text-cerulean-200" to="/">
            {" "}
            Homepage
          </Link>
          ?
        </h3>
      </ErrorPage>
    ) : (
      this.props.children
    );
  }
}
