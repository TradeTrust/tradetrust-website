import styled from "@emotion/styled";
import React, { useContext } from "react";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { ButtonSolidRedWhite, ButtonSolidWhiteGrey } from "../../Button";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";

interface DeleteResolverConfirmationProps extends OverlayContentProps {
  name: string;
  deleteAddress: () => void;
}

export const DeleteResolverConfirmation = styled(
  ({ name, deleteAddress, ...props }: DeleteResolverConfirmationProps) => {
    const { setOverlayVisible } = useContext(OverlayContext);

    return (
      <OverlayContent {...props}>
        <div className="flex">
          <p>Are you sure you want to delete {name}?</p>
        </div>
        <div className="flex mt-4">
          <div className="w-auto ml-auto mr-2">
            <ButtonSolidWhiteGrey
              onClick={() => {
                setOverlayVisible(false);
              }}
            >
              Cancel
            </ButtonSolidWhiteGrey>
          </div>
          <div className="w-auto">
            <ButtonSolidRedWhite onClick={deleteAddress}>Delete</ButtonSolidRedWhite>
          </div>
        </div>
      </OverlayContent>
    );
  }
)`
  ${OverlayContentBaseStyle()}
  height: auto;
  max-width: 400px;
`;
