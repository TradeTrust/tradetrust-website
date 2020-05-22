import React, { useContext } from "react";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { ButtonSolidWhiteGrey, ButtonSolidRedWhite } from "../../Button";
import styled from "@emotion/styled";

interface DeleteResolverConfirmationProps extends OverlayContentProps {
  name: string;
  deleteAddress: () => void;
}

export const DeleteResolverConfirmation = styled(
  ({ name, deleteAddress, ...props }: DeleteResolverConfirmationProps) => {
    const { setOverlayVisible } = useContext(OverlayContext);

    return (
      <OverlayContent {...props}>
        <div className="flex-fill">
          <p>Are you sure you want to delete {name}?</p>
        </div>
        <div className="row no-gutters">
          <div className="col-auto ml-auto mr-2">
            <ButtonSolidWhiteGrey
              onClick={() => {
                setOverlayVisible(false);
              }}
            >
              Cancel
            </ButtonSolidWhiteGrey>
          </div>
          <div className="col-auto">
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
