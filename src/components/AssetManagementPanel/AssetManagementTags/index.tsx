import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { DOCUMENT_SCHEMA } from "../../../reducers/certificate";
import { TokenRegistryVersions } from "../../../constants";
import { useTokenRegistryVersion } from "../../../common/hooks/useTokenRegistryVersion";

interface AssetManagementTagsProps {
  isTransferableDocument?: boolean;
  /** Obligation record (e.g. BoE) — shows Obligation instead of Transferable. */
  isObligation?: boolean;
  /**
   * How many credentials a Verifiable Presentation carries. Undefined for anything that is not
   * a presentation.
   */
  presentationCredentialCount?: number;
}

export const AssetManagementTags: FunctionComponent<AssetManagementTagsProps> = ({
  isTransferableDocument = false,
  isObligation = false,
  presentationCredentialCount,
}) => {
  const { documentSchema } = useSelector((state: RootState) => state.certificate);
  const tokenRegistryVersion = useTokenRegistryVersion();

  const tagCSSBlue = "bg-cerulean-300/[25%] text-cerulean-500 rounded-full font-gilroy-bold";
  const tagCSOrange = "bg-tangerine-500/[24%] text-tangerine-500 rounded-full font-gilroy-bold";
  const tagCSSGrey = "bg-cloud-100 text-cloud-500 rounded-full font-gilroy-bold";

  // A presentation is an envelope, not a credential: none of the credential-shaped tags below
  // (Transferable, Obligation, TR version, the VC data model) describe it. It gets its own
  // version tag plus a count of what is inside.
  //
  // The two colours carry meaning and are not interchangeable. Blue marks the ENVELOPE, the way
  // it marks the other whole-document properties above. The count is orange because it refers to
  // what is INSIDE, tying it to the orange "W3C VC" version tag each credential shows on its own
  // tab below — so the count and the tags it counts read as one family, and the envelope reads
  // as something else.
  if (presentationCredentialCount !== undefined) {
    return (
      <div className="flex flex-wrap py-2 gap-2">
        {documentSchema === DOCUMENT_SCHEMA.W3C_VP_1_1 && (
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            W3C VP V1.1
          </Tag>
        )}
        {documentSchema === DOCUMENT_SCHEMA.W3C_VP_2_0 && (
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            W3C VP V2.0
          </Tag>
        )}
        <Tag rounded="rounded-full" className={tagCSOrange}>
          {presentationCredentialCount} Credential{presentationCredentialCount === 1 ? "" : "s"}
        </Tag>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap py-2 gap-2">
      {isObligation ? (
        <>
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            Obligation
          </Tag>
          <Tag rounded="rounded-full" className={tagCSSBlue}>
            Negotiable
          </Tag>
        </>
      ) : (
        isTransferableDocument && (
          <>
            <Tag rounded="rounded-full" className={tagCSSBlue}>
              Transferable
            </Tag>
            <Tag rounded="rounded-full" className={tagCSSBlue}>
              Negotiable
            </Tag>
          </>
        )
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
      {!isObligation && tokenRegistryVersion === TokenRegistryVersions.V4 && (
        <Tag rounded="rounded-full" className={tagCSSGrey}>
          TR V4
        </Tag>
      )}
      {!isObligation && tokenRegistryVersion === TokenRegistryVersions.V5 && (
        <Tag rounded="rounded-full" className={tagCSOrange}>
          TR V5
        </Tag>
      )}
    </div>
  );
};
