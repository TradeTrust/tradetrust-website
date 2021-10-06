import React, { FunctionComponent } from "react";
import { ReactNode } from "react-markdown";
import { useSelector } from "react-redux";
import { getDemoCreateStatus } from "../../../reducers/demo";
import { DemoCreateStatus } from "../../../types";
import { DemoCreateForm } from "./DemoCreateForm";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";

export const DemoCreate: FunctionComponent = () => {
  const demoCreateStatus = useSelector(getDemoCreateStatus);

  const components: Record<DemoCreateStatus, ReactNode> = {
    form: <DemoCreateForm />,
    issue: <DemoCreateIssue />,
    review: <DemoCreateReview />,
    start: <DemoCreateStart />,
  };

  return (
    <>
      <DemoCreateHeader />
      {components[demoCreateStatus]}
    </>
  );
};
