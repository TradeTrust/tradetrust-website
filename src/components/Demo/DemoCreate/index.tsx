import React, { FunctionComponent, useContext, useState } from "react";
import { ReactNode } from "react-markdown";
import { DemoCreateContext } from "./contexts/DemoCreateContext";
import { DemoFormProvider } from "./contexts/DemoFormContext";
import { Prompt } from "react-router";
import { useRouter } from "next/router";
import { Location } from "history";
import { useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import { DemoCreateForm } from "./DemoCreateForm";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";
import { ModalNavigateOut } from "../ModalNavigateOut";

export const DemoCreate: FunctionComponent = () => {
  const router = useRouter();
  const { activeStep } = useContext(DemoCreateContext);
  const { setOverlayVisible, showOverlay } = useOverlayContext();
  const [isOnNavigateOut, setOnNavigateOut] = useState(false);
  const when = activeStep !== "start" && activeStep !== "issue";

  const components: Record<string, ReactNode> = {
    form: <DemoCreateForm />,
    issue: <DemoCreateIssue />,
    review: <DemoCreateReview />,
    start: <DemoCreateStart />,
  };

  const closeModal = () => {
    setOverlayVisible(false);
    showOverlay(undefined);
  };

  const handlePrompt = (location: Location) => {
    if (!isOnNavigateOut) {
      setOverlayVisible(true);
      showOverlay(
        <ModalNavigateOut
          closeModal={closeModal}
          closeModalAndNavigate={() => {
            closeModal();
            router.push(location.pathname);
          }}
          setOnNavigateOut={setOnNavigateOut}
        />
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <Prompt when={when} message={handlePrompt} />
      <DemoCreateHeader />
      <DemoFormProvider>{components[activeStep]}</DemoFormProvider>
    </>
  );
};

export default DemoCreate;
