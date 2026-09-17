import { isObfuscated } from "@trustvc/trustvc";
import React, { FunctionComponent, useEffect, useState } from "react";
import { WrappedOrSignedOpenAttestationDocument } from "../../utils/shared";
import { SignedVerifiableCredential } from "@trustvc/trustvc";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { DOCUMENT_SCHEMA } from "../../reducers/certificate";

interface ObfuscatedMessageProps {
  document: WrappedOrSignedOpenAttestationDocument | SignedVerifiableCredential;
}

export const ObfuscatedMessage: FunctionComponent<ObfuscatedMessageProps> = ({ document }) => {
  const { documentSchema } = useSelector((state: RootState) => state.certificate);
  const [isDocumentObfuscated, setIsDocumentObfuscated] = useState<boolean | null>(null);

  useEffect(() => {
    /**
     * Guards against a result arriving for a document that is no longer being shown.
     *
     * isObfuscated is async and takes no abort signal, so without this the effect had two
     * faults. Unmounting mid-check set state on a dead component — React's "state update on an
     * unmounted component" warning. Worse, changing document while a check was in flight left
     * both running, and whichever settled LAST won: the older document's verdict could overwrite
     * the newer one's, showing (or hiding) the obfuscation notice against the wrong document.
     */
    let cancelled = false;

    // Clear the previous document's verdict before checking the new one. The guard below stops a
    // stale result overwriting a fresh one, but the LAST result stayed on screen while the new
    // check ran — so switching documents briefly showed the old one's obfuscation notice against
    // the new document. Showing nothing for that moment is better than describing the wrong
    // document; the effect only re-runs when the document actually changes.
    setIsDocumentObfuscated(null);

    const checkObfuscation = async () => {
      try {
        const result = await isObfuscated(document);
        if (!cancelled) setIsDocumentObfuscated(result);
      } catch (error) {
        console.warn("Error checking if document is obfuscated:", error);
        if (!cancelled) setIsDocumentObfuscated(false);
      }
    };

    checkObfuscation();

    return () => {
      cancelled = true;
    };
  }, [document]);

  // Return null while checking or if not obfuscated
  if (isDocumentObfuscated === null || !isDocumentObfuscated) return null;
  return (
    <div className="container">
      <div className="text-lg font-gilroy-bold text-scarlet-500" data-testid="obfuscation-info">
        <p className="py-6">
          {documentSchema === DOCUMENT_SCHEMA.W3C_VC_2_0
            ? "Note: Some fields/data might be obfuscated in this document."
            : "Note: There are fields/data obfuscated in this document."}
        </p>
      </div>
    </div>
  );
};
