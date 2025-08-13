import React, { FunctionComponent } from "react";
import { Book, Info } from "react-feather";
import { useOverlayContext } from "../../../../../common/contexts/OverlayContext";
import { NETWORK_NAME } from "../../../../../config";
import { ExternalLinkEtherscanAddress } from "../../../../UI/ExternalLink";
import { TooltipIcon } from "../../../../UI/SvgIcon";
import { AssetTitle } from "../../../AssetTitle";
import { SkeletonPlaceholder } from "../../SkeletonPlaceholder";
import { OverlayAddressBook } from "../../../../AddressBook";
import { ButtonIcon } from "../../../../Button";
import { Input } from "../../../../UI/Input";
import { useTokenRegistryVersion } from "../../../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../../../constants";

interface EditableAssetTitleProps {
  role: string;
  value?: string;
  isEditable: boolean;
  newValue?: string;
  onSetNewValue?: (newValue: string) => void;
  isError?: boolean;
  isRemark?: boolean;
  isSubmitted?: boolean;
}

export const EditableAssetTitle: FunctionComponent<EditableAssetTitleProps> = ({
  role,
  value,
  newValue,
  isEditable,
  onSetNewValue,
  isError: error,
  isRemark,
  isSubmitted,
}) => {
  const { showOverlay } = useOverlayContext();
  const tokenRegistryVersion = useTokenRegistryVersion();
  const onOverlayHandler = () => {
    showOverlay(<OverlayAddressBook onAddressSelected={onSetNewValue} network={NETWORK_NAME} title="Address Book" />);
  };

  if (!value) return <SkeletonPlaceholder />;
  if (isEditable && isRemark)
    return (
      <AssetTitle role={role} address={""}>
        <textarea
          className="w-full rounded-xl font-normal py-2.5 px-3 border border-cloud-100 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-cerulean-500 placeholder-cloud-300"
          data-testid={`editable-input-${role.toLowerCase()}`}
          maxLength={120}
          value={newValue}
          placeholder={
            tokenRegistryVersion === TokenRegistryVersions.V5
              ? `Enter remarks here (max 120 characters)`
              : "Supported only on v5"
          }
          disabled={isSubmitted || tokenRegistryVersion !== TokenRegistryVersions.V5}
          style={{
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
          onChange={(event) => {
            if (!onSetNewValue) return;
            onSetNewValue(event.target.value);
          }}
        />
        <div className="text-cloud-300 my-2 flex items-start space-x-2 w-full" data-testid="remarks-icon-text">
          <div className="w-auto mr-2">
            <TooltipIcon content="Any remarks provided will be accessible in the endorsement chain by any verifiers of this document.">
              <Info />
            </TooltipIcon>
          </div>
          <p
            style={{
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              margin: 0,
            }}
          >
            Any remarks provided will be accessible in the endorsement chain by any verifiers of this document.
          </p>
        </div>
      </AssetTitle>
    );
  if (!isEditable)
    return (
      <AssetTitle role={role} address={value}>
        <ExternalLinkEtherscanAddress
          name={value}
          address={value}
          data-testid={`non-editable-input-${role.toLowerCase()}`}
        >
          <h6>{value}</h6>
        </ExternalLinkEtherscanAddress>
      </AssetTitle>
    );
  return (
    <AssetTitle role={role} address={newValue || ""}>
      <div className="flex items-start">
        <div className="w-full mr-2">
          <Input
            className="w-full rounded-xl font-normal py-2.5 border-cloud-100"
            data-testid={`editable-input-${role.toLowerCase()}`}
            type="text"
            value={newValue}
            placeholder={`Input ${role}'s address`}
            onChange={(event) => {
              if (!onSetNewValue) return;
              onSetNewValue(event.target.value);
            }}
            hasError={error}
          />
          {error && (
            <div className="text-scarlet-500 my-2" data-testid="error-msg">
              Unidentified address. Please check and input again.
            </div>
          )}
        </div>
        <div className="w-auto">
          <ButtonIcon className="bg-white rounded-xl border-cloud-100 hover:bg-cloud-100" onClick={onOverlayHandler}>
            <Book className="text-cerulean-500" />
          </ButtonIcon>
        </div>
      </div>
    </AssetTitle>
  );
};
