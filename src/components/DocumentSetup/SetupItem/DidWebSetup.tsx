import React, { useEffect, useImperativeHandle } from "react";
import { useCreatorContext } from "../../../common/contexts/CreatorContext";
import { SetupItem } from "../SetupItem";

export interface DidWebSetupProps {}

const DidWebSetupRef = (
  props: DidWebSetupProps,
  ref: React.Ref<HTMLDivElement | { onClose: () => void }>
): React.JSX.Element => {
  const { did, processDid, resetDid } = useCreatorContext();
  const { state, stateMessage } = did || {};

  useImperativeHandle(
    ref,
    () => ({
      onClose: () => {
        resetDid();
      },
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (state === undefined) {
      processDid();
    }

    return () => {
      resetDid();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [state]);

  useEffect(() => {}, [did]);

  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <SetupItem
        state={state!}
        title={
          <div>
            DNS & DID:web record.{" "}
            <a
              href="https://docs.tradetrust.io/docs/introduction/key-components-of-tradetrust/w3c-vc/identify-the-issuer/issuer-method-did-web"
              target="_blank"
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
        }
        description={stateMessage!}
      />
    </div>
  );
};

export const DidWebSetup = React.forwardRef<HTMLDivElement | { onClose: () => void }, DidWebSetupProps>(DidWebSetupRef);
