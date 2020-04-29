import React from "react";
import { ExternalLink } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle } from "../../../../UI/Input";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";

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
  newValue?: string | null;
  onSetNewValue: (newBeneficiary: string) => void;
}

export const EditableAssetTitle = ({ role, value, isEditable, onSetNewValue }: EditableAssetTitleProps) => {
  if (!value) return <SkeletonPlaceholder />;
  if (!isEditable)
    return (
      <AssetTitle role={role} address={value}>
        <ExternalLink name={value} address={value} />
      </AssetTitle>
    );
  return (
    <AssetTitle role={role} address={value}>
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
    </AssetTitle>
  );
};
