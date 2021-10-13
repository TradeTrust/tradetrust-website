import React, { FunctionComponent, useContext, useState } from "react";
import { ReactNode } from "react-markdown";
import { DemoCreateContext } from "./contexts/DemoCreateContext";
import { DemoFormProvider } from "./contexts/DemoFormContext";
import { Prompt } from "react-router";
import { useHistory } from "react-router-dom";
import { Location } from "history";
import { useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import { DemoCreateForm } from "./DemoCreateForm";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";
import { ModalNavigateOut } from "../ModalNavigateOut";

export const DemoCreate: FunctionComponent = () => {
  const history = useHistory();
  const { activeStep } = useContext(DemoCreateContext);
  const { setOverlayVisible, showOverlay } = useOverlayContext();
  const [isUserNavigateOut, setIsUserNavigateOut] = useState(false);
  const when = activeStep !== "start";

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
    if (!isUserNavigateOut) {
      setOverlayVisible(true);
      showOverlay(
        <ModalNavigateOut
          closeModal={closeModal}
          closeModalAndNavigate={() => {
            closeModal();
            history.push(location.pathname);
          }}
          setIsUserNavigateOut={setIsUserNavigateOut}
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
