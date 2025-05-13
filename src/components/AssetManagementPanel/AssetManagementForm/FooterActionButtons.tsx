import React from "react";
import { Button } from "../../Button";
import { ButtonClose } from "../../UI/Overlay/OverlayContent";

export const FooterActionButtons = ({
  setShowEndorsementChain,
  closeOverlay,
}: {
  setShowEndorsementChain: (payload: boolean) => void;
  closeOverlay: () => void;
}) => {
  return (
    <div className="w-full flex flex-col xs:flex-row mx-0 gap-2">
      <Button
        className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full xs:w-auto flex-none xs:flex-1"
        onClick={() => {
          /* Handle action */
          setShowEndorsementChain(true);
          closeOverlay();
        }}
      >
        View Endorsement Chain
      </Button>
      <ButtonClose className="w-full xs:w-auto flex-none xs:flex-1" />
    </div>
  );
};
