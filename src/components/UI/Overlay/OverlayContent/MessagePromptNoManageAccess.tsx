import React, { useContext } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { mixin } from "../../../../styles";
import { ButtonSolidOrangeWhite } from "./../../../UI/Button";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";

export const MessagePromptNoManageAccess = styled(({ ...props }: OverlayContentProps) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <OverlayContent {...props}>
      <div className="flex-fill">
        <p>Oops! It seems like you do not have access to manage assets.</p>
      </div>
      <div className="row no-gutters">
        <div className="col-auto ml-auto">
          <ButtonSolidOrangeWhite onClick={handleCloseOverlay}>Close</ButtonSolidOrangeWhite>
        </div>
      </div>
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}

  max-width: 400px;
  max-height: 240px;

  .overlay-title {
    ${mixin.fontSize(26)};
  }
`;
