import React, { Component } from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../styles";

const ErrorBoundaryStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 50px 15px;

  .error {
    ${mixin.containerCustom}
    text-align: center;

    h2 {
      ${mixin.fontSourcesansproBold}
      color: ${vars.brandOrange};
      text-transform: uppercase;
      padding-top: 20px;
      padding-bottom: 10px;

      ${mixin.fontSize(32)}
      letter-spacing: 2px;

      @media only screen and (min-width: ${vars.md}) {
        ${mixin.fontSize(36)}
        letter-spacing: 4px;
      }

      @media only screen and (min-width: ${vars.lg}) {
        ${mixin.fontSize(40)}
        letter-spacing: 6px;
      }
    }

    p {
      color: ${vars.black};
      padding-bottom: 10px;

      ${mixin.fontSize(16)}

      @media only screen and (min-width: ${vars.md}) {
        ${mixin.fontSize(20)}
      }

      @media only screen and (min-width: ${vars.lg}) {
        ${mixin.fontSize(24)}
      }
    }

    a {
      ${mixin.fontSourcesansproBold}
      display: inline-block;
      padding: 15px 35px;
      background-color: ${vars.brandNavy};
      border: none;
      border-radius: 40px;
      color: ${vars.white};
      text-transform: uppercase;
      text-decoration: none;
      transition: 0.3s background-color ${vars.easeOutCubic}, 0.3s color ${vars.easeOutCubic};

      ${mixin.fontSize(14)}

      &:hover {
        background-color: ${vars.brandOrange};
        color: ${vars.white};
      }
    }
  }
`;

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
        <ErrorBoundaryStyled>
          <div id="error">
            <div className="error">
              <br />
              <img src="/static/images/errorpage/error.png" style={{ height: "15vh" }} />
              <h2>Something went wrong!</h2>
              <p>There is an error with this document, please contact your issuing institution.</p>
              <a href="/">Go Back</a>
            </div>
          </div>
        </ErrorBoundaryStyled>
      );
    }

    return this.props.children;
  }
}
