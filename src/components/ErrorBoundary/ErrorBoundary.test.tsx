import { mount } from "enzyme";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

const ProblemChild = () => {
  throw new Error("Error thrown from problem child");
};
/* eslint-disable no-console */
// disabled lint for the overridden console to not show the error from the problem child.
const pauseErrorLogging = (codeToRun: () => void) => {
  const logger = console.error;
  console.error = () => {};

  codeToRun();

  console.error = logger;
};

describe("<ErrorBoundary />", () => {
  it("should catch errors with componentDidCatch", () => {
    const history = createMemoryHistory();

    pauseErrorLogging(() => {
      jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
      mount(
        <Router history={history}>
          <ErrorBoundary>
            <ProblemChild />
          </ErrorBoundary>
        </Router>
      );
      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    });
  });
});