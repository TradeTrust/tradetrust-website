export interface InlineTemplateRenderMethod {
  type: "INLINE_TEMPLATE";
  template: {
    templateName: string;
    html: string;
    css: string;
  };
}

const isInlineTemplateRenderMethod = (method: unknown): method is InlineTemplateRenderMethod =>
  !!method &&
  typeof method === "object" &&
  (method as { type?: unknown }).type === "INLINE_TEMPLATE" &&
  !!(method as { template?: unknown }).template;

/**
 * Finds an `INLINE_TEMPLATE` renderMethod entry among a document's `renderMethod` array (or
 * single object, for documents that haven't adopted the array form). A document can carry
 * this alongside URL-based or data:-URI renderMethod entries -- this only ever looks for
 * this one type, ignoring the rest.
 */
export function findInlineTemplateRenderMethod(document: unknown): InlineTemplateRenderMethod | undefined {
  const renderMethod = (document as { renderMethod?: unknown })?.renderMethod;
  const methods = [renderMethod].flat().filter(Boolean);
  return methods.find(isInlineTemplateRenderMethod);
}
