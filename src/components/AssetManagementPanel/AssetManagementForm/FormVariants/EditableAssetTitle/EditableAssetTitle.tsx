import {
  OverlayAddressBook,
  ButtonIcon,
  useOverlayContext,
  InputEditableAssetTitle,
  InputError,
} from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { Book } from "react-feather";
import { NETWORK_NAME } from "../../../../../config";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";

interface EditableAssetTitleProps {
  role: string;
  value?: string;
  isEditable: boolean;
  newValue?: string;
  onSetNewValue?: (newValue: string) => void;
  error?: boolean;
}

export const EditableAssetTitle = ({
  role,
  value,
  newValue,
  isEditable,
  onSetNewValue,
  error,
}: EditableAssetTitleProps) => {
  const { showOverlay } = useOverlayContext();

  const onOverlayHandler = () => {
    showOverlay(<OverlayAddressBook onAddressSelected={onSetNewValue} network={NETWORK_NAME} title="Address Book" />);
  };

  if (!value) return <SkeletonPlaceholder />;
  if (!isEditable)
    return (
      <AssetTitle role={role} address={value}>
        <ExternalLinkEtherscanAddress
          name={value}
          address={value}
          data-testid={`non-editable-input-${role.toLowerCase()}`}
        />
      </AssetTitle>
    );
  return (
    <AssetTitle role={role} address={newValue || ""}>
      <div className="flex items-start">
        <div className="w-64 mr-2">
          <InputEditableAssetTitle
            data-testid={`editable-input-${role.toLowerCase()}`}
            type="text"
            value={newValue}
            hasError={error}
            placeholder={`Input ${role}'s address`}
            onChange={(event) => {
              if (!onSetNewValue) return;
              onSetNewValue(event.target.value);
            }}
          />
          {error && (
            <InputError data-testid="error-msg">Unidentified address. Please check and input again.</InputError>
          )}
        </div>
        <div className="w-auto">
          <ButtonIcon className="bg-orange hover:bg-orange-600" onClick={onOverlayHandler}>
            <Book className="text-white" />
          </ButtonIcon>
        </div>
      </div>
    </AssetTitle>
  );
};
