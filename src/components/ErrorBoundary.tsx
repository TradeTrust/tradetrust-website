import React, { Component } from "react";
import css from "./error.scss";

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
        <div className={`${css.box}`}>
          <div id="error">
            <div className={`${css.error}`}>
              <br />
              <img src="/static/images/errorpage/error.png" style={{ height: "15vh" }} />
              <h2>Something went wrong!</h2>
              <p>There is an error with this document, please contact your issuing institution.</p>
              <a href="/">Go Back</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
