import { render, screen, fireEvent } from "@testing-library/react";
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

const MockFallbackComponent = ({ recover }: { recover: () => void }) => (
  <>
    <div>Fallback component</div>
    <button onClick={recover}>Retry</button>
  </>
);

describe("<ErrorBoundary />", () => {
  it("should catch errors with componentDidCatch", () => {
    const history = createMemoryHistory();

    pauseErrorLogging(() => {
      jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");
      render(
        <Router history={history}>
          <ErrorBoundary FallbackComponent={MockFallbackComponent} onRecover={() => {}}>
            <ProblemChild />
          </ErrorBoundary>
        </Router>
      );
      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalledTimes(1);
    });
  });

  it("should show FallbackComponent", () => {
    render(
      <ErrorBoundary FallbackComponent={MockFallbackComponent} onRecover={() => {}}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText("Fallback component")).toBeInTheDocument();
  });

  it("should call recover", () => {
    const onRecoverMock = jest.fn();
    render(
      <ErrorBoundary FallbackComponent={MockFallbackComponent} onRecover={onRecoverMock}>
        <ProblemChild />
      </ErrorBoundary>
    );
    fireEvent.click(screen.getByText("Retry"));
    expect(onRecoverMock).toHaveBeenCalledTimes(1);
  });
});
