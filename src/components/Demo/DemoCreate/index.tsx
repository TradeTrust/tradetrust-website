import React, { FunctionComponent, useContext } from "react";
import { ReactNode } from "react-markdown";
import { DemoCreateContext } from "./contexts/DemoCreateContext";
import { DemoFormProvider } from "./contexts/DemoFormContext";
import { DemoCreateForm } from "./DemoCreateForm";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";
import { useWarnIfUnsavedChanges } from "../../../common/hooks/useWarnIfUnsavedChanges";
import { useAuthContext } from "../../../common/contexts/AuthenticationContext";

export const DemoCreate: FunctionComponent = () => {
  const { activeStep } = useContext(DemoCreateContext);

  const { isLoggedIn } = useAuthContext();

  useWarnIfUnsavedChanges(isLoggedIn);

  const components: Record<string, ReactNode> = {
    form: <DemoCreateForm />,
    issue: <DemoCreateIssue />,
    review: <DemoCreateReview />,
    start: <DemoCreateStart />,
  };

  return (
    <>
      <DemoCreateHeader />
      <DemoFormProvider>{components[activeStep]}</DemoFormProvider>
    </>
  );
};
