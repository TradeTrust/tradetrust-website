import { Location } from "history";
import React, { FunctionComponent, useContext, useState } from "react";
import { ReactNode } from "react-markdown";
import { Prompt } from "react-router";
import { useHistory } from "react-router-dom";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { gaEvent } from "../../../common/utils/analytics";
import { GaAction, GaCategory } from "../../../types";
import { ModalNavigateOut } from "../ModalNavigateOut";
import { DemoCreateContext } from "./contexts/DemoCreateContext";
import { DemoCreateForm } from "./DemoCreateForm";
import { DemoCreateHeader } from "./DemoCreateHeader";
import { DemoCreateIssue } from "./DemoCreateIssue";
import { DemoCreateReview } from "./DemoCreateReview";
import { DemoCreateStart } from "./DemoCreateStart";

export const DemoCreate: FunctionComponent = () => {
  const history = useHistory();
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
            history.push(location.pathname);
            gaEvent({
              action: GaAction.MAGIC_DROP_OFF,
              category: GaCategory.MAGIC_DEMO,
            });
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
      {components[activeStep]}
    </>
  );
};
