import React from "react";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle } from "../../../../UI/Input";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";

interface EditableAssetTitleProps {
  role: string;
  value?: string;
  isEditable: boolean;
  newValue?: string | null;
  onSetNewValue: (newBeneficiary: string) => void;
}

export const EditableAssetTitle = ({ role, value, isEditable, onSetNewValue }: EditableAssetTitleProps) => {
  if (!value) return <SkeletonPlaceholder />;
  if (!isEditable)
    return (
      <AssetTitle role={role} address={value}>
        <ExternalLinkEtherscanAddress name={value} address={value} />
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
      </div>
    </AssetTitle>
  );
};
