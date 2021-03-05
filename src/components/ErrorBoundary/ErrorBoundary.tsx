import React, { Component } from "react";
import { ErrorPage } from "./ErrorPage";

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          title="Something went wrong!"
          description="There is an error with this document, please contact your issuing institution."
        />
      );
    }

    return this.props.children;
  }
}
