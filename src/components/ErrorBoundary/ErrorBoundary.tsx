import { ErrorPage } from "@govtechsg/tradetrust-ui-components";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Record<string, unknown>, ErrorBoundaryState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="Something went wrong"
          description="There is an error with this document, please contact your issuing institution."
        >
          <Link
            className="mt-4 inline-block px-8 py-4 bg-cerulean-50 hover:bg-tangerine-600 text-white hover:text-white border-none rounded-full font-semibold uppercase no-underline transition duration-300 ease-out text-sm"
            to="/"
          >
            Go back to home
          </Link>
        </ErrorPage>
      );
    }

    return this.props.children;
  }
}
