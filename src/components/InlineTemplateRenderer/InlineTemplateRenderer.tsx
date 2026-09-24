import React, { FunctionComponent, useEffect, useRef } from "react";
import { fillInlineTemplate } from "./fillInlineTemplate";
import { findInlineTemplateRenderMethod } from "./findInlineTemplateRenderMethod";

interface InlineTemplateRendererProps {
  document: unknown;
}

/**
 * Renders a document's `INLINE_TEMPLATE` renderMethod entry, if it has one -- the credential
 * carries its own markup and CSS as plain data (see generic-templates' inlineTemplate/
 * modules), and this fills that markup against the credential's own `credentialSubject`.
 *
 * Deliberately NOT an iframe/FrameConnector: there's no renderMethod URL involved and no
 * remote code to sandbox, so none of that machinery is needed. The template is parsed via
 * DOMParser (never inserted with dangerouslySetInnerHTML/innerHTML against the live page),
 * filled in that detached document, and only the filled result is moved into a Shadow DOM
 * host -- so the app's CSS can't leak into the template and the template's CSS can't leak
 * into the app, without hand-namespacing every selector.
 */
export const InlineTemplateRenderer: FunctionComponent<InlineTemplateRendererProps> = ({ document: doc }) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const method = findInlineTemplateRenderMethod(doc);
  const credentialSubject = (doc as { credentialSubject?: Record<string, unknown> })?.credentialSubject;

  useEffect(() => {
    const host = hostRef.current;
    if (!method || !host) return;

    const parsed = new DOMParser().parseFromString(method.template.html, "text/html");
    fillInlineTemplate(parsed.body, credentialSubject);

    const shadow = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    shadow.innerHTML = "";
    const style = window.document.createElement("style");
    style.textContent = method.template.css;
    shadow.appendChild(style);
    Array.from(parsed.body.childNodes).forEach((node) => shadow.appendChild(node));
  }, [method, credentialSubject]);

  if (!method) return null;
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
};
