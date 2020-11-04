import { useAddressBook, useThirdPartyAPIEndpoints } from "@govtechsg/address-identity-resolver";
import { AddressBook, ButtonIconOrangeWhite, OverlayContext } from "@govtechsg/tradetrust-ui-components";
import React, { useContext } from "react";
import { Book } from "react-feather";
import { NETWORK } from "../../../../../config";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { InputEditableAssetTitle, InputEditableWrapper, InputError } from "../../../../UI/Input";
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
  const { showOverlay } = useContext(OverlayContext);
  const { handleLocalAddressBookCsv, addressBook } = useAddressBook();
  const { thirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const onOverlayHandler = () => {
    showOverlay(
      <AddressBook
        title="Address Book"
        onAddressSelected={onSetNewValue}
        handleLocalAddressBookCsv={handleLocalAddressBookCsv}
        addressBook={addressBook}
        network={NETWORK}
        thirdPartyAPIEndpoints={thirdPartyAPIEndpoints}
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
      <div className="row no-gutters align-items-center">
        <InputEditableWrapper className="col mr-2">
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
        </InputEditableWrapper>
        <div className="col-auto">
          <ButtonIconOrangeWhite onClick={onOverlayHandler}>
            <Book />
          </ButtonIconOrangeWhite>
        </div>
      </div>
    </AssetTitle>
  );
};
