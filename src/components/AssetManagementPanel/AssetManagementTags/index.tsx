import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DOCUMENT_SCHEMA } from "../../../reducers/certificate";
import { TokenRegistryVersions } from "../../../constants";
import { useTokenRegistryVersion } from "../../../common/hooks/useTokenRegistryVersion";

interface AssetManagementTagsProps {
  isTransferableDocument?: boolean;
}

export const AssetManagementTags: FunctionComponent<AssetManagementTagsProps> = ({
  isTransferableDocument = false,
}) => {
  const { documentSchema } = useSelector((state: RootState) => state.certificate);
  const tokenRegistryVersion = useTokenRegistryVersion();

  const tagCSSBlue = "bg-cerulean-300/[25%] text-cerulean-500 rounded-full font-gilroy-bold";
  const tagCSOrange = "bg-tangerine-500/[24%] text-tangerine-500 rounded-full font-gilroy-bold";
  const tagCSSGrey = "bg-cloud-100 text-cloud-500 rounded-full font-gilroy-bold";
  return (
    <div className="flex flex-wrap py-2 gap-2">
      {isTransferableDocument && (
        <>
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            Transferable
          </Tag>
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            Negotiable
          </Tag>
        </>
      )}
      {documentSchema === DOCUMENT_SCHEMA.OA_V3 && (
        <Tag rounded="rounded-full" className={tagCSSGrey}>
          OA
        </Tag>
      )}
      {documentSchema === DOCUMENT_SCHEMA.W3C_VC_1_1 && (
        <Tag rounded="rounded-full" className={tagCSOrange}>
          W3C VC V1.1
        </Tag>
      )}
      {documentSchema === DOCUMENT_SCHEMA.W3C_VC_2_0 && (
        <Tag rounded="rounded-full" className={tagCSOrange}>
          W3C VC V2.0
        </Tag>
      )}
      {tokenRegistryVersion === TokenRegistryVersions.V4 && (
        <Tag rounded="rounded-full" className={tagCSSGrey}>
          TR V4
        </Tag>
      )}
      {tokenRegistryVersion === TokenRegistryVersions.V5 && (
        <Tag rounded="rounded-full" className={tagCSOrange}>
          TR V5
        </Tag>
      )}
    </div>
  );
};
