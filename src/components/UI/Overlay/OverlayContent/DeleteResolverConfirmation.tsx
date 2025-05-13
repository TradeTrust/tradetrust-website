import React, { FunctionComponent } from "react";
import { useOverlayContext } from "../../../../common/contexts/OverlayContext";
import { Button } from "../../../Button";
import { OverlayContentProps } from "./index";
import { ConfirmationContent, MESSAGE_TYPE } from "./ConfirmationContent";

interface DeleteResolverConfirmationProps extends OverlayContentProps {
  name: string;
  deleteAddress: () => void;
}

export const DeleteResolverConfirmation: FunctionComponent<DeleteResolverConfirmationProps> = ({
  name,
  deleteAddress,
}) => {
  const { closeOverlay } = useOverlayContext();

  return (
    <ConfirmationContent messageType={MESSAGE_TYPE.NONE} title="Delete Address Resolver">
      <p className="text-cloud-800">Are you sure you want to delete this address resolver?</p>
      <p className="text-cloud-800 mt-7">{name}</p>
      <div className="flex flex-row mt-7 justify-center">
        <Button
          className="bg-white hover:bg-slate-50 border-cloud-100 rounded-xl px-3 py-2 text-cerulean"
          onClick={closeOverlay}
        >
          Cancel
        </Button>
        <Button
          className="bg-scarlet-500 hover:bg-red-600 rounded-xl px-3 py-2 ml-8 text-white"
          onClick={deleteAddress}
        >
          Delete
        </Button>
      </div>
    </ConfirmationContent>
  );
};
