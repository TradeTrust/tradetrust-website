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
          pageTitle="ERROR"
          header="Something Went Wrong"
          description="There is an error with this document, please contact your issuing institution."
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
      );
    }

    return this.props.children;
  }
}
