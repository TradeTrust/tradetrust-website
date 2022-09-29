import React, { FunctionComponent } from "react";
import * as Sentry from "@sentry/react";
import { FallbackRender } from "@sentry/react/types/errorboundary";

interface SentryErrorBoundaryProps {
  children: React.ReactNode;
  onRecover?: () => void; // this is additional, for error recovery pertaining to sentry error boundary, catering to specific component
}

export const SentryErrorBoundary: FunctionComponent<SentryErrorBoundaryProps> = ({ children, onRecover }) => {
  const FallbackComponent: FallbackRender = (errorData) => {
    const { error, componentStack, resetError } = errorData;

    console.log(error, "FallbackComponent");

    return (
      <>
        <h4 className="mb-2">{error.toString()}</h4>
        <pre className="break-words whitespace-pre-wrap bg-black text-white p-4 text-sm">{componentStack}</pre>
        <button
          className="bg-indigo-500 text-white rounded p-2 my-4"
          onClick={() => {
            if (onRecover) {
              onRecover(); // should attempt to recover errored child state here
            }
            resetError();
          }}
        >
          Try again
        </button>
      </>
    );
  };

  const onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    event.preventDefault();
    event.promise.catch(async (error) => {
      console.log(error, "!!!");
      Sentry.captureException(new Error(error));
    });
  };

  const onMount = () => {
    window.addEventListener("unhandledrejection", onUnhandledRejection);
  };

  const onUnmount = () => {
    window.removeEventListener("unhandledrejection", onUnhandledRejection);
  };

  const onError = () => {
    console.log("onError !!");
  };

  return (
    <Sentry.ErrorBoundary
      fallback={FallbackComponent}
      onMount={onMount}
      onUnmount={onUnmount}
      onError={onError}
      showDialog
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
