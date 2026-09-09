import React, { FunctionComponent, useMemo, useRef, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { errorMessages } from "@trustvc/trustvc";
import {
  getCredentialDownloadName,
  getCredentialLabel,
  getCredentialVersionTag,
  getPresentationCredentials,
} from "../../utils/presentation";
import { LoaderSpinner } from "../UI/Loader";
import { Tag } from "../UI/Tag";
import { CredentialDocumentView } from "./CredentialDocumentView";
import { useCredentialVerification } from "./useCredentialVerification";

const { MESSAGES, TYPES } = errorMessages;

/** The same three checks the document status panel reports, in the same order. */
const CREDENTIAL_CHECKS = [
  { type: "DOCUMENT_STATUS", messageSet: MESSAGES[TYPES.ISSUED] },
  { type: "ISSUER_IDENTITY", messageSet: MESSAGES[TYPES.IDENTITY] },
  { type: "DOCUMENT_INTEGRITY", messageSet: MESSAGES[TYPES.HASH] },
];

interface CredentialTabsProps {
  presentation: unknown;
  /** The uploaded file's name, used to name each credential's download uniquely. */
  fileName: string;
}

/**
 * Renders each credential embedded in a Verifiable Presentation on its own tab.
 *
 * A presentation is a bundle, so there is no single document to render: each credential carries
 * its own renderer template, its own issuer and its own verification result. Each tab therefore
 * shows that credential's identity and checks above the rendered document, while the document
 * status panel above reports on the envelope.
 */
export const CredentialTabs: FunctionComponent<CredentialTabsProps> = ({ presentation, fileName }) => {
  const credentials = useMemo(() => getPresentationCredentials(presentation), [presentation]);
  const verifications = useCredentialVerification(credentials);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * The selected tab, stamped with the presentation it was chosen in.
   *
   * Resetting this in an effect instead leaves one render in between: effects run after paint,
   * so a newly loaded presentation would be rendered with the previous one's index still in
   * place. When it holds fewer credentials that index points past the end and the panel is
   * handed an undefined credential — a mislabelled tab, a version tag defaulted from nothing, an
   * empty renderer. Deriving the index below means it is never out of range at all.
   */
  const [selection, setSelection] = useState<{ presentation: unknown; index: number }>({
    presentation,
    index: 0,
  });

  const selected =
    selection.presentation === presentation && selection.index < credentials.length ? selection.index : 0;

  const select = (index: number) => setSelection({ presentation, index });

  /**
   * Arrow/Home/End movement between tabs, per the ARIA tabs pattern. Without it the strip is
   * reachable by Tab and activated by Enter, but cannot be moved through — and with the roving
   * tabIndex below, Tab now leaves the strip rather than walking every credential.
   */
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = credentials.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = selected === last ? 0 : selected + 1;
        break;
      case "ArrowLeft":
        next = selected === 0 ? last : selected - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  if (credentials.length === 0) return null;

  const active = credentials[selected];
  const activeResult = verifications[selected];
  const issuer = activeResult?.issuer;

  return (
    <div data-testid="credential-tabs">
      <div className="container">
        {/* Font and size follow the "Presented by:" label in IssuedBy; the uppercase and the
            0.04em tracking are the reference's own caption treatment. mt-8 separates it from the
            status panel above, which it otherwise butted straight up against. */}
        <div className="text-cloud-800 uppercase tracking-[0.04em] mt-8 mb-3">Credentials in this presentation</div>
      </div>

      <div className="container">
        <div
          className="flex overflow-x-auto items-end"
          role="tablist"
          aria-label="Credentials in this presentation"
          onKeyDown={onTabKeyDown}
        >
          {credentials.map((credential, index) => {
            const isActive = index === selected;
            const result = verifications[index];
            return (
              <button
                key={credential?.id ?? index}
                id={`credential-tab-${index}`}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`credential-panel-${index}`}
                // Roving tabIndex: the strip is one Tab stop and the arrow keys move within it,
                // rather than every credential being its own Tab stop.
                tabIndex={isActive ? 0 : -1}
                data-testid={`credential-tab-${index}`}
                className={`px-3 py-2 mr-2 multi-tab border-t border-r border-l rounded-t-xl border-cloud-100 flex items-center whitespace-nowrap ${
                  isActive ? "bg-white text-cloud-800" : "bg-cloud-100 text-cloud-300"
                }`}
                onClick={() => select(index)}
              >
                <span className="mr-2 flex items-center" aria-hidden="true">
                  {result?.loading ? (
                    <LoaderSpinner width="16px" primary="#4DA6E8" secondary="#E7EAEC" />
                  ) : result?.isValid ? (
                    <CheckCircle className="text-forest-500 w-4 h-4" />
                  ) : (
                    <XCircle className="text-scarlet-500 w-4 h-4" />
                  )}
                </span>
                <span className="truncate">{getCredentialLabel(credential, index)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="bg-white"
        id={`credential-panel-${selected}`}
        role="tabpanel"
        aria-labelledby={`credential-tab-${selected}`}
      >
        {/* This credential's own identity and checks — the panel above covers the presentation
            envelope, not what is inside it. */}
        <div className="container">
          {/* Same px-4 inset and same grid as DocumentStatus above, so this credential's issuer
              and checks line up under the presentation's own — rather than the checks being
              pushed to the far right by a space-between row. Extra padding on top only: the tab
              strip butts directly against this panel, so a uniform p-4 left "Issued by:" sitting
              tight under the active tab's border. */}
          <div className="px-4 pt-6 pb-4">
            <div className="flex-1 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 grid-flow-row gap-2 justify-between">
              <div className="col-span-1">
                <div className="break-all text-cloud-800">Issued by:</div>
                <h4 className="text-cloud-800 leading-none break-all">{issuer ?? "Unknown"}</h4>
                {/* The data-model version, matching the tag a standalone credential gets. */}
                <div className="flex flex-wrap py-2 gap-2">
                  <Tag
                    rounded="rounded-full"
                    className="bg-tangerine-500/[24%] text-tangerine-500 rounded-full font-gilroy-bold"
                  >
                    {getCredentialVersionTag(active)}
                  </Tag>
                </div>
              </div>

              <div className="col-span-1 flex items-start flex-col" data-testid={`credential-checks-${selected}`}>
                {CREDENTIAL_CHECKS.map(({ type, messageSet }) => {
                  const status = activeResult?.status?.[type];
                  const valid = status === "VALID";
                  return (
                    <div
                      key={type}
                      className="flex justify-start items-center py-2 h-9"
                      data-testid={`credential-check-${type.toLowerCase()}`}
                      data-status={activeResult?.loading ? "PENDING" : status}
                    >
                      <div className="w-5 h-5 flex-1 flex">
                        {activeResult?.loading ? (
                          <LoaderSpinner width="20px" primary="#4DA6E8" secondary="#E7EAEC" />
                        ) : valid ? (
                          <CheckCircle className="text-forest-500 w-5 h-5" />
                        ) : (
                          <XCircle className="text-scarlet-500 w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p className="pl-2 mb-0 text-sm leading-5">
                          {activeResult?.loading || valid ? messageSet.successTitle : messageSet.failureTitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Keyed so switching tabs remounts the renderer — the iframe holds the previous
            credential's template and does not re-render on a prop change alone. */}
        <CredentialDocumentView
          key={selected}
          credential={active}
          downloadName={getCredentialDownloadName(fileName, active, selected)}
        />
      </div>

      {/* Every tab's `aria-controls` must point at an element that exists, but only the selected
          panel is rendered above — so the inactive tabs would reference nothing. These stand in
          for them, empty and hidden. Rendering their content instead would mount a renderer, and
          therefore an iframe, per credential. */}
      {credentials.map((_, index) =>
        index === selected ? null : (
          <div
            key={index}
            id={`credential-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`credential-tab-${index}`}
            hidden
          />
        )
      )}
    </div>
  );
};
