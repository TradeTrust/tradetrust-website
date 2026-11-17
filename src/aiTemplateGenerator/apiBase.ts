/** Origin of trustvc-ai-functions. Empty means a same-origin path, used in tests. */
export function templateGeneratorUrl(path: string): string {
  const configured = process.env.TEMPLATE_GENERATOR_API_URL;
  const base = typeof configured === "string" ? configured.replace(/\/$/, "") : "";
  return `${base}${path}`;
}
