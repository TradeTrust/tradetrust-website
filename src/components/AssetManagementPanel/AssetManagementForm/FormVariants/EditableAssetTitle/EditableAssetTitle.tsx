import { useThirdPartyAPIEndpoints } from "@govtechsg/address-identity-resolver";
import { AddressBook, ButtonIcon, useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { Book } from "react-feather";
import { NETWORK_NAME } from "../../../../../config";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle, InputError } from "../../../../UI/Input";
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
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const onOverlayHandler = () => {
    showOverlay(
      <AddressBook
        title="Address Book"
        onAddressSelected={onSetNewValue}
        thirdPartyAPIEndpoints={thirdPartyAPIEndpoints}
        network={NETWORK_NAME}
      />
    );
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
            value={newValue}
            hasError={error}
            placeholder={`Input ${role}'s address`}
            onChange={(event) => {
              if (!onSetNewValue) return;
              onSetNewValue(event.target.value);
            }}
          />
          {error && (
            <InputError data-testid={"error-msg"}>Unidentified address. Please check and input again.</InputError>
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
