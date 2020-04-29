import React from "react";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";
import { ExternalLink } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle } from "../../../../UI/Input";
// import {
//   ButtonIconOrangeWhite,
// } from "../../../../UI/Button";
// import {
//   SvgIcon,
//   SvgIconBook,
// } from "../../../../UI/SvgIcon";

interface EditableAssetTitleProps {
  role: string;
  value: string;
  isEditable: boolean;
  newValue: string;
  onSetNewValue: (newBeneficiary: string) => void;
}

export const EditableAssetTitle = ({ role, value, isEditable, onSetNewValue }: EditableAssetTitleProps) => {
  if (!value) return <SkeletonPlaceholder />;
  if (!isEditable) return <ExternalLink name={value} address={value} />;
  return (
    <div className="row no-gutters align-items-center">
      <div className="col">
        <InputEditableAssetTitle
          data-testid={`editable-input-${role.toLowerCase()}`}
          value={value}
          onChange={(event) => {
            console.log(event);
            onSetNewValue(event.target.value);
          }}
        />
      </div>
      {/*
      <div className="col-auto ml-2">
        <ButtonIconOrangeWhite>
          <SvgIcon>
            <SvgIconBook />
          </SvgIcon>
        </ButtonIconOrangeWhite>
      </div>
      */}
    </div>
  );
};
