import React from "react";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle, InputEditableWrapper, InputError } from "../../../../UI/Input";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";

interface EditableAssetTitleProps {
  role: string;
  value?: string;
  isEditable: boolean;
  newValue?: string;
  onSetNewValue?: (newBeneficiary: string) => void;
  errorState?: string;
}

export const EditableAssetTitle = ({
  role,
  value,
  newValue,
  isEditable,
  onSetNewValue,
  errorState,
}: EditableAssetTitleProps) => {
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
        <InputEditableWrapper className="col">
          <InputEditableAssetTitle
            data-testid={`editable-input-${role.toLowerCase()}`}
            value={newValue}
            hasError={errorState === "ERROR"}
            placeholder={`Input ${role}'s address`}
            onChange={(event) => {
              if (!onSetNewValue) return;
              onSetNewValue(event.target.value);
            }}
          />
          {errorState === "ERROR" && (
            <InputError data-testid={"error-msg"}>Unidentified address. Please check and input again.</InputError>
          )}
        </InputEditableWrapper>
      </div>
    </AssetTitle>
  );
};
