import { templateGeneratorUrl } from "./apiBase";
import { shrinkForUpload } from "./shrinkForUpload";
import { UPLOAD_CAP_BYTES } from "./types";

export const GENERATE_ERROR_CODES = [
  "INVALID_FILE_TYPE",
  "FILE_TOO_LARGE",
  "UNREADABLE_FILE",
  "AI_TIMEOUT",
  "AI_INVALID_OUTPUT",
  "RATE_LIMITED",
  "DAILY_LIMIT_REACHED",
  "CREDIT_EXHAUSTED",
  "SERVICE_DOWN",
  "NOT_A_DOCUMENT",
  "CONSENT_REQUIRED",
  "AUTH_REQUIRED",
] as const;

export type GenerateErrorCode = (typeof GENERATE_ERROR_CODES)[number];

export type CredentialPair = { key: string; value: string };

export type CredentialSubject = Record<string, CredentialPair>;

export type TemplateField = {
  id: string;
  label: string;
  name: string;
  group: string;
  type: string;
  confidence?: number;
};

export type TemplateFiles = {
  documentType: string;
  template: string;
  stylesheet: string;
  credentialSubject: CredentialSubject;
  context: Record<string, unknown>;
  fields: TemplateField[];
  attemptsRemaining: number | null;
};

export type GenerateResult = { ok: true; files: TemplateFiles } | { ok: false; code: GenerateErrorCode | "UNKNOWN" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isGenerateErrorCode(value: string): value is GenerateErrorCode {
  return (GENERATE_ERROR_CODES as readonly string[]).includes(value);
}

async function prepareUpload(
  file: File
): Promise<{ ok: true; file: File } | { ok: false; code: "UNREADABLE_FILE" | "FILE_TOO_LARGE" }> {
  try {
    const upload = await shrinkForUpload(file);
    if (upload.size > UPLOAD_CAP_BYTES) return { ok: false, code: "FILE_TOO_LARGE" };
    return { ok: true, file: upload };
  } catch {
    return { ok: false, code: "UNREADABLE_FILE" };
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function credentialSubjectFrom(value: Record<string, unknown>): CredentialSubject {
  const credentialSubject: CredentialSubject = {};
  Object.entries(value).forEach(([name, item]) => {
    if (!isRecord(item) || typeof item.key !== "string") return;
    credentialSubject[name] = { key: item.key, value: typeof item.value === "string" ? item.value : "" };
  });
  return credentialSubject;
}

function fieldFrom(item: unknown): TemplateField | null {
  if (!isRecord(item) || typeof item.label !== "string" || typeof item.name !== "string") return null;
  return {
    id: typeof item.id === "string" ? item.id : item.name,
    label: item.label,
    name: item.name,
    group: typeof item.group === "string" ? item.group : "",
    type: typeof item.type === "string" ? item.type : "string",
    ...(typeof item.confidence === "number" ? { confidence: item.confidence } : {}),
  };
}

function fieldsFrom(value: unknown): TemplateField[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const field = fieldFrom(item);
    return field ? [field] : [];
  });
}

function filesFromPayload(payload: unknown): TemplateFiles | null {
  if (!isRecord(payload) || typeof payload.template !== "string" || !isRecord(payload.credentialSubject)) return null;
  return {
    documentType: typeof payload.documentType === "string" ? payload.documentType : "document",
    template: payload.template,
    stylesheet: typeof payload.stylesheet === "string" ? payload.stylesheet : "",
    credentialSubject: credentialSubjectFrom(payload.credentialSubject),
    context: isRecord(payload.context) ? payload.context : {},
    fields: fieldsFrom(payload.fields),
    attemptsRemaining: typeof payload.attemptsRemaining === "number" ? payload.attemptsRemaining : null,
  };
}

function failureCode(response: Response, payload: unknown): GenerateErrorCode | "UNKNOWN" {
  const code = isRecord(payload) && typeof payload.code === "string" ? payload.code : undefined;
  if (code && isGenerateErrorCode(code)) return code;
  if (response.status === 401) return "AUTH_REQUIRED";
  return "UNKNOWN";
}

/** POST /template-generator/generate. Server text is dropped; only a known code is returned. */
export async function generateTemplate(idToken: string, file: File): Promise<GenerateResult> {
  const prepared = await prepareUpload(file);
  if (!prepared.ok) return prepared;

  const body = new FormData();
  body.append("file", prepared.file, prepared.file.name);
  body.append("consent", "true");

  let response: Response;
  try {
    response = await fetch(templateGeneratorUrl("/template-generator/generate"), {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${idToken}` },
      body,
    });
  } catch {
    return { ok: false, code: "UNKNOWN" };
  }

  const payload = await readJson(response);
  const files = filesFromPayload(payload);
  if (response.ok && files) return { ok: true, files };
  return { ok: false, code: failureCode(response, payload) };
}
