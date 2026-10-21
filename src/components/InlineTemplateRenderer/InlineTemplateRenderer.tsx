import {
  decompressInlineTemplate,
  getRenderMethods,
  printInlineTemplate,
  renderInlineTemplate,
} from "@trustvc/trustvc";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const hasInlineTemplateRenderMethod = (doc: unknown): boolean => !!getRenderMethods(doc).inlineTemplate;

interface InlineTemplateRendererProps {
  document: unknown;
  /** Called when the inline template can't be decompressed or rendered, so the caller can fall back. */
  onFailure?: () => void;
}

/**
 * React wrapper around trustvc's `renderInlineTemplate`, which finds the document's
 * `INLINE_HTML_TEMPLATE` renderMethod entry, fills its markup against `credentialSubject` in a
 * detached DOMParser document, and mounts the result in a sandboxed `srcdoc` iframe inside the
 * host. The template is issuer-controlled HTML, so it must never reach this page's DOM: in the
 * frame its event handlers can't run, it can't load anything remote, and it can't draw over
 * the verification status around it. This component only owns the host element and the
 * page-width frame around it. Its ref exposes `print()`, matching DecentralisedRendererContainer's.
 */
export const InlineTemplateRenderer = forwardRef<{ print: () => void } | undefined, InlineTemplateRendererProps>(
  function InlineTemplateRenderer({ document: doc, onFailure }, ref) {
    const hostRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      print: () => {
        if (hostRef.current) printInlineTemplate(hostRef.current);
      },
    }));
    const hasInlineTemplate = hasInlineTemplateRenderMethod(doc);
    // Kept in a ref so a new callback identity from the parent doesn't re-run the render effect.
    const onFailureRef = useRef(onFailure);
    onFailureRef.current = onFailure;

    useEffect(() => {
      let cancelled = false;
      // A string `template` is gzipped (signed in that form), so inflate it before rendering.
      decompressInlineTemplate(doc)
        .then((decompressed) => {
          if (cancelled || !hostRef.current) return;
          if (!renderInlineTemplate(decompressed, hostRef.current))
            throw new Error("No renderable INLINE_HTML_TEMPLATE entry");
        })
        .catch((e) => {
          if (cancelled) return;
          console.error("Failed to render inline template", e);
          onFailureRef.current?.();
        });
      return () => {
        cancelled = true;
      };
    }, [doc]);

    if (!hasInlineTemplate) return null;
    // NOT tradetrust-website's own `.container` class: generic-templates overrides Tailwind's
    // `container` theme to drop the 475px step and cap at 1280px (see its src/tailwind.js and
    // the compiled src/main.css), while this app's own `.container` caps at 1536px -- two
    // different configs that only agree below 1280px. Since the thing being matched is the
    // iframe-rendered template's actual width (governed by generic-templates' config), this
    // replicates that config's compiled rules exactly, rather than reusing this app's own.
    return (
      <>
        <style>{`
        .inline-template-frame {
          width: 100%;
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) { .inline-template-frame { max-width: 640px; } }
        @media (min-width: 768px) { .inline-template-frame { max-width: 768px; } }
        @media (min-width: 1024px) { .inline-template-frame { max-width: 1024px; } }
        @media (min-width: 1280px) { .inline-template-frame { max-width: 1280px; } }
      `}</style>
        <div className="inline-template-frame">
          <div ref={hostRef} data-testid="inline-template-renderer" />
        </div>
      </>
    );
  }
);
