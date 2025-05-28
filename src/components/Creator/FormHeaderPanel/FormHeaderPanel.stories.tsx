import React, { FunctionComponent } from "react";
import { FormHeaderPanel } from "./FormHeaderPanel";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../../../store";
import { QueueState } from "../../../constants/QueueState";
import { getDisplayTitle } from "../../ProcessDocumentScreen";

export default {
  title: "Creator/FormHeaderPanel",
  component: FormHeaderPanel,
  parameters: {
    componentSubtitle: "Header panel with progress bar and navigation buttons for form steps",
  },
  argTypes: {
    queueState: {
      control: "select",
      options: [QueueState.INITIALIZED, QueueState.PENDING, QueueState.CONFIRMED, QueueState.ERROR],
    },
    title: {
      control: "text",
    },
    step: {
      control: "number",
    },
    totalSteps: {
      control: "number",
    },
  },
  args: {
    queueState: QueueState.INITIALIZED,
    title: "Custom Callbacks",
    step: 1,
    totalSteps: 3,
  },
};

const store = configureStore();

// Wrapper component to provide necessary context
const StoryWrapper: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

export const Custom: FunctionComponent<{ step: number; title: string }> = (args) => {
  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel
          step={args.step}
          title={args.title}
          onNext={() => {
            alert("Next button clicked with custom handler");
          }}
          onPrevious={() => {
            alert("Previous button clicked with custom handler");
          }}
        />
      </div>
    </StoryWrapper>
  );
};

export const Step1: FunctionComponent = () => {
  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel step={1} title="Fill Form" nextRoute="/creator/preview" />
      </div>
    </StoryWrapper>
  );
};

export const Step2: FunctionComponent = () => {
  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel
          step={2}
          title="Preview Form"
          previousRoute="/creator/form"
          nextRoute="/creator/publish"
          nextLabel="Issue Document"
        />
      </div>
    </StoryWrapper>
  );
};

export const Step3WithQueueState: FunctionComponent<{ queueState: QueueState }> = (args) => {
  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel
          step={3}
          title={getDisplayTitle(args.queueState)}
          previousRoute="/creator/preview"
          nextRoute="/creator/done"
          nextLabel="Complete"
          queueState={args.queueState}
          processAnotherDocumentFn={() => {
            alert("Process another document");
          }}
        />
      </div>
    </StoryWrapper>
  );
};

export const WithErrors: FunctionComponent = () => {
  // Create validation errors in the format expected by FormErrorBanner
  const formErrors = [
    {
      message: "Recipient is required",
      path: "document.recipient",
      context: {
        errorType: "required" as const,
        missingProperty: "recipient",
      },
    },
    {
      message: "Reference number is required",
      path: "document.reference",
      context: {
        errorType: "required" as const,
        missingProperty: "reference",
      },
    },
  ];

  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel
          step={1}
          title="Fill Form with Errors"
          formErrors={formErrors}
          formErrorTitle="Please fix the following errors"
          nextRoute="/creator/preview"
        />
      </div>
    </StoryWrapper>
  );
};

export const WithCustomButtonAction: FunctionComponent = () => {
  const handleNext = () => {
    alert("Next button clicked with custom handler");
  };

  const handleBack = () => {
    alert("Back button clicked with custom handler");
  };

  return (
    <StoryWrapper>
      <div className="max-w-screen-lg">
        <FormHeaderPanel
          step={2}
          title="Custom Callbacks"
          onNext={handleNext}
          onPrevious={handleBack}
          nextLabel="Custom Next"
          previousLabel="Custom Back"
        />
      </div>
    </StoryWrapper>
  );
};
