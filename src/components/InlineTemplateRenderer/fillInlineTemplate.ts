/**
 * Fills a parsed INLINE_TEMPLATE DOM tree against a credential's `credentialSubject`, in
 * place. Two binding rules only, both ours (not a W3C convention):
 * - `[data-field="x"]` -- set to `String(data.x)` via `.textContent` (never `.innerHTML`,
 *   so injection via a malicious credentialSubject value is structurally impossible, not
 *   just escaped).
 * - `<template data-repeat="x">...</template>` -- cloned once per item in `data.x` (an
 *   array); `data-field` attributes inside the clone resolve against that array item, not
 *   the top-level `data`.
 *
 * `root` is expected to come from a freshly `DOMParser`-parsed document (see
 * InlineTemplateRenderer.tsx) -- never the live page document -- since the whole point of
 * this mechanism is that the stored template is inert data, not something we trust to run
 * unmodified against the real DOM until it's been filled.
 */
function fillField(el: Element, data: Record<string, unknown> | undefined): void {
  const key = el.getAttribute("data-field");
  if (!key) return;
  const value = data?.[key];
  el.textContent = value === undefined || value === null ? "" : String(value);
}

/**
 * `[data-field-src="x"]` -- set via `.src` instead of `.textContent`, for an `<img>` (e.g. a
 * `logo` field carrying a `data:` URI). Kept as a narrow, single-purpose directive -- "set
 * src on an img" -- rather than a generic "set this attribute" mechanism, since an
 * `<img src>` can't execute script even from an attacker-controlled value (unlike, say, an
 * `href`), so this can't become an injection vector the way a generic attribute-setter could.
 */
function fillFieldSrc(el: Element, data: Record<string, unknown> | undefined): void {
  const key = el.getAttribute("data-field-src");
  if (!key) return;
  const value = data?.[key];
  if (value === undefined || value === null) {
    el.removeAttribute("src");
    return;
  }
  el.setAttribute("src", String(value));
}

export function fillInlineTemplate(root: ParentNode, subject: Record<string, unknown> | undefined): void {
  // Fill top-level fields FIRST, while every <template>'s content is still an inert
  // DocumentFragment (not part of the light tree, so this querySelectorAll can't reach
  // inside it). Repeat blocks are cloned and inserted afterwards, last, specifically so
  // there is no later top-level pass left to re-touch (and clobber) the freshly-filled
  // clones with the wrong (parent-scoped) data.
  root.querySelectorAll("[data-field]").forEach((el) => fillField(el, subject));
  root.querySelectorAll("[data-field-src]").forEach((el) => fillFieldSrc(el, subject));

  root.querySelectorAll("template[data-repeat]").forEach((node) => {
    const tpl = node as HTMLTemplateElement;
    const key = tpl.getAttribute("data-repeat");
    const items = (key && (subject?.[key] as Record<string, unknown>[])) || [];
    const parent = tpl.parentNode;
    if (!parent) return;

    const ownerDocument = tpl.ownerDocument;
    items.forEach((item) => {
      const clone = ownerDocument.importNode(tpl.content, true);
      clone.querySelectorAll("[data-field]").forEach((fieldEl) => fillField(fieldEl, item));
      clone.querySelectorAll("[data-field-src]").forEach((fieldEl) => fillFieldSrc(fieldEl, item));
      parent.insertBefore(clone, tpl);
    });
    parent.removeChild(tpl);
  });
}
