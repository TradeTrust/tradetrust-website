type TemplateEvent =
  | "sign_in"
  | "sign_out"
  | "generate"
  | "edit"
  | "reset"
  | "template_error"
  | "download"
  | "start_over"
  | "upload_new_document"
  | "feedback_click";

const CONTEXT_KEYS = new Set(["step", "code"]);

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string | number>>;
  }
}

/** One analytics event. The payload is the event name plus step or error code, never document content. */
export function trackTemplateEvent(name: TemplateEvent, context: Record<string, string | number> = {}): void {
  if (typeof window === "undefined") return;
  const safe: Record<string, string | number> = { event: `ai_template_${name}`, feature: "ai_template_generator" };
  Object.entries(context).forEach(([key, value]) => {
    if (CONTEXT_KEYS.has(key)) safe[key] = value;
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(safe);
}
