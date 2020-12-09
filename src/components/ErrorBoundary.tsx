import styled from "@emotion/styled";
import React, { Component } from "react";
import tw from "twin.macro";
import { mixin } from "../styles";

const ErrorBoundaryStyled = styled.div`
  ${tw`w-full min-h-screen py-12 px-4`}

  .error {
    text-align: center;

    h2 {
      ${mixin.fontSourcesansproBold}
      ${tw`text-orange uppercase pt-5 pb-2 text-3xl md:text-4xl lg:text-5xl`}
    }

    img {
      ${tw`mx-auto`}
    }

    p {
      ${tw`text-black pb-2 text-base md:text-lg lg:text-2xl`}
    }

    a {
      ${mixin.fontSourcesansproBold}
      ${tw`inline-block px-8 py-4 bg-navy border-none rounded-full text-white uppercase no-underline transition duration-300 ease-out text-sm`}

      &:hover {
        ${tw`bg-orange text-white`}
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
            <div className="error container">
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
