import React, { useEffect, useImperativeHandle } from "react";
import { SetupItem } from "./SetupItem";
import { useCreatorContext } from "../../../common/contexts/CreatorContext";
import { useProviderContext } from "../../../common/contexts/provider";
import { Button, ButtonSize } from "@tradetrust-tt/tradetrust-ui-components";

export interface TokenRegistrySetupProps {}

const TokenRegistrySetupRef = (
  props: TokenRegistrySetupProps,
  ref: React.Ref<HTMLDivElement | { onClose: () => void }>
): React.JSX.Element => {
  const { providerOrSigner, currentChainId, providerType } = useProviderContext();
  const { tokenRegistry, processTokenRegistry, resetTokenRegistry } = useCreatorContext();

  const { state, stateMessage, displayRedeployTokenRegistry } = tokenRegistry || {};
  useImperativeHandle(
    ref,
    () => ({
      onClose: () => {
        resetTokenRegistry();
      },
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (state === undefined) {
      processTokenRegistry(providerOrSigner, currentChainId!, providerType);
    }

    return () => {
      resetTokenRegistry();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <SetupItem
        state={state!}
        title={
          <div>
            Smart contract address for Token Registry.{" "}
            <a
              href="https://docs.tradetrust.io/docs/introduction/key-components-of-tradetrust/w3c-vc/identify-the-issuer/issuer-method-did-web"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
        }
        description={
          <div className="flex flex-col xs:flex-row flex-wrap gap-2">
            <div className="flex-1">{stateMessage!}</div>
            {displayRedeployTokenRegistry && (
              <div className="w-32">
                <Button
                  className="flex-1 bg-cerulean-500 text-white hover:bg-cerulean-800 w-full h-12"
                  size={ButtonSize.MD}
                  onClick={() => processTokenRegistry(providerOrSigner, currentChainId!, providerType)}
                  data-testid="confirm-modal-confirm-button"
                >
                  Redeploy
                </Button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export const TokenRegistrySetup = React.forwardRef<HTMLDivElement, TokenRegistrySetupProps>(TokenRegistrySetupRef);
