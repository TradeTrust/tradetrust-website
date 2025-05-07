import { Button, ButtonSize } from "@tradetrust-tt/tradetrust-ui-components";
import React, { ForwardRefExoticComponent, FunctionComponent, useEffect } from "react";
import { CreatorItemState, useCreatorContext } from "../../common/contexts/CreatorContext";
import { useOverlayContext } from "../../common/contexts/OverlayContext";
import { HeaderIconState, Model } from "../UI/Overlay/OverlayContent/Model";
import { DidWebSetup, DidWebSetupProps } from "./SetupItem/DidWebSetup";
import { TokenRegistrySetup, TokenRegistrySetupProps } from "./SetupItem/TokenRegistrySetup";
import { getFormConfigByName } from "../../common/utils/form-config";
import { useConfigContext } from "../../common/contexts/ConfigContext";
import { Config, FormTemplate } from "../../types";
import { useHistory } from "react-router-dom";
import { useFormsContext } from "../../common/contexts/FormsContext";

export enum DocumentSetupType {
  DID_WEB,
  TOKEN_REGISTRY,
  // BITSTRING_STATUSLIST,
}

export interface DocumentSetupProps {
  types: DocumentSetupType[];
  formName: string;
}

const Setup: Record<DocumentSetupType, ForwardRefExoticComponent<DidWebSetupProps | TokenRegistrySetupProps>> = {
  [DocumentSetupType.DID_WEB]: DidWebSetup,
  [DocumentSetupType.TOKEN_REGISTRY]: TokenRegistrySetup,
  // [DocumentSetupType.BITSTRING_STATUSLIST]: () => {
  //   throw new Error("Function not implemented.");
  // },
};

export const DocumentSetup: FunctionComponent<DocumentSetupProps> = ({ types, formName }) => {
  const DocumentSetupStep = types.map((t) => {
    const SetupComponent = Setup[t];
    return <SetupComponent key={t} />;
  });

  const { closeOverlay } = useOverlayContext();
  const { did, tokenRegistry } = useCreatorContext();
  const [documentSetupState, setDocumentSetupState] = React.useState<(typeof HeaderIconState)["LOADING"]>();
  const { setConfig } = useConfigContext();
  const { newForm } = useFormsContext();
  const history = useHistory();

  useEffect(() => {
    const documentSetupContexts = [did, tokenRegistry];
    const isLoading = types.some((t) => documentSetupContexts[t]?.state === CreatorItemState.LOADING);
    const isError = types.some((t) => documentSetupContexts[t]?.state === CreatorItemState.ERROR);
    const isSuccess = types.every((t) => documentSetupContexts[t]?.state === CreatorItemState.SUCCESS);

    if (isLoading) {
      setDocumentSetupState(HeaderIconState.LOADING);
    } else if (isError) {
      setDocumentSetupState(HeaderIconState.ERROR);
    } else if (isSuccess) {
      setDocumentSetupState(HeaderIconState.SUCCESS);
    } else {
      setDocumentSetupState(HeaderIconState.LOADING);
    }
  }, [did, tokenRegistry, types]);

  return (
    <Model
      data-testid="documentSetup"
      headerIconState={documentSetupState}
      collapsible={false}
      title="Document Setup"
      footer={
        <>
          <Button
            className="flex-1 bg-white text-cerulean-500 hover:bg-cloud-100 w-full xs:w-auto flex-1 h-12"
            size={ButtonSize.LG}
            onClick={() => closeOverlay()}
            data-testid={`documentSetupCancel`}
          >
            Cancel
          </Button>
          <Button
            className={`flex-1 bg-cerulean-500 text-white hover:bg-cerulean-800 w-full xs:w-auto flex-1 h-12 disabled:cursor-not-allowed`}
            size={ButtonSize.LG}
            disabled={documentSetupState !== HeaderIconState.SUCCESS}
            onClick={() => {
              closeOverlay();
              const selectedConfig = getFormConfigByName(formName);
              const newConfig: Config = { forms: selectedConfig as FormTemplate };
              setConfig(newConfig);
              newForm(newConfig);
              history.push("/creator/form");
            }}
            data-testid={`documentSetupContinue`}
          >
            Continue
          </Button>
        </>
      }
    >
      {DocumentSetupStep}
    </Model>
  );
};
