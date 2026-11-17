import { TemplateFiles } from "./generate";

export type FileTab = "tpl" | "css" | "cs" | "ctx";

export type DraftFiles = {
  tpl: string;
  css: string;
  cs: string;
  ctx: string;
};

export type FileIssue = { tab: FileTab; line: number | null; message: string };

const NAME_RULE = /^[A-Za-z][A-Za-z0-9_]{0,63}$/;
const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

export const FILE_NOTES: Record<FileTab, string> = {
  tpl: "The HTML template, in the INLINE_HTML_TEMPLATE format: data-field fills an element from the credentialSubject, one element per field. Keys are flat, with no dots and no lists. A renamed data-field name is copied to the credentialSubject and the @context.",
  css: "The stylesheet for the HTML template. All styling goes here: the template itself has no style or link tags. Class names match the template.",
  cs: 'The credentialSubject is an object. Each property name is a data-field from the HTML template, and each value is { "key", "value" }. key is the label printed on the document and value is the text copied from it. Change a value and the preview above changes. The download keeps the labels but clears the values.',
  ctx: "The @context. Every field name in the HTML template must be defined here. Rename a term here and the HTML template follows.",
};

export function draftFromFiles(files: TemplateFiles): DraftFiles {
  return {
    tpl: files.template,
    css: files.stylesheet,
    cs: JSON.stringify({ credentialSubject: files.credentialSubject }, null, 2),
    ctx: JSON.stringify(files.context, null, 2),
  };
}

function lineOf(text: string, index: number): number {
  return text.slice(0, Math.max(0, index)).split("\n").length;
}

function dataFields(text: string): Array<{ name: string; index: number }> {
  const found: Array<{ name: string; index: number }> = [];
  const pattern = /data-field\s*=\s*"([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) found.push({ name: match[1], index: match.index });
  return found;
}

function checkHtml(text: string): FileIssue[] {
  const issues: FileIssue[] = [];
  const banned = /<\s*(script|iframe|object|embed|link|style|form)\b|javascript:|\son[a-z]+\s*=/gi;
  let bannedMatch: RegExpExecArray | null;
  while ((bannedMatch = banned.exec(text))) {
    issues.push({
      tab: "tpl",
      line: lineOf(text, bannedMatch.index),
      message: "The template is body content only. Scripts, frames, style tags and event handlers are not allowed.",
    });
  }
  dataFields(text).forEach((field) => {
    if (!NAME_RULE.test(field.name)) {
      issues.push({
        tab: "tpl",
        line: lineOf(text, field.index),
        message: `data-field="${field.name}" must start with a letter and use only letters, numbers and underscores.`,
      });
    }
  });

  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?>/g;
  const stack: Array<{ name: string; line: number }> = [];
  let tag: RegExpExecArray | null;
  while ((tag = tagPattern.exec(text))) {
    const raw = tag[0];
    const name = tag[1].toLowerCase();
    if (raw.endsWith("/>") || VOID_TAGS.has(name)) continue;
    if (raw.startsWith("</")) {
      const at = stack.map((item) => item.name).lastIndexOf(name);
      if (at < 0) {
        issues.push({ tab: "tpl", line: lineOf(text, tag.index), message: `</${name}> has no matching opening tag.` });
      } else {
        stack
          .splice(at)
          .slice(1)
          .forEach((open) => {
            issues.push({ tab: "tpl", line: open.line, message: `<${open.name}> is never closed.` });
          });
      }
      continue;
    }
    stack.push({ name, line: lineOf(text, tag.index) });
  }
  stack.forEach((open) => issues.push({ tab: "tpl", line: open.line, message: `<${open.name}> is never closed.` }));
  return issues;
}

function checkCss(text: string): FileIssue[] {
  const issues: FileIssue[] = [];
  const imported = text.search(/@import/i);
  if (imported >= 0) {
    issues.push({
      tab: "css",
      line: lineOf(text, imported),
      message: "@import is not allowed. Put the rules in this file.",
    });
  }
  const url = text.search(/url\s*\(/i);
  if (url >= 0) {
    issues.push({
      tab: "css",
      line: lineOf(text, url),
      message: "url() is not allowed. The stylesheet cannot load external files.",
    });
  }
  return issues;
}

type Subject = Record<string, { key: string; value: string }>;

function subjectFrom(text: string): { subject: Subject | null; issues: FileIssue[] } {
  try {
    const value = JSON.parse(text) as unknown;
    const raw =
      value && typeof value === "object" && !Array.isArray(value)
        ? (value as { credentialSubject?: unknown }).credentialSubject
        : undefined;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return {
        subject: null,
        issues: [{ tab: "cs", line: 1, message: 'The file must be one object holding "credentialSubject": { … }.' }],
      };
    }
    const issues: FileIssue[] = [];
    const subject: Subject = {};
    Object.entries(raw).forEach(([name, item]) => {
      if (!NAME_RULE.test(name)) {
        issues.push({
          tab: "cs",
          line: null,
          message: `"${name}" must start with a letter and use only letters, numbers and underscores.`,
        });
        return;
      }
      const record = item as { key?: unknown; value?: unknown };
      if (!record || typeof record !== "object" || typeof record.key !== "string" || !record.key.trim()) {
        issues.push({ tab: "cs", line: null, message: `"${name}" needs an object with "key" and "value".` });
        return;
      }
      if (typeof record.value !== "string") {
        issues.push({ tab: "cs", line: null, message: `"${name}" needs the document text in "value".` });
        return;
      }
      subject[name] = { key: record.key, value: record.value };
    });
    return { subject, issues };
  } catch {
    return {
      subject: null,
      issues: [{ tab: "cs", line: 1, message: "This is not valid JSON. Check for a missing comma, quote or bracket." }],
    };
  }
}

export function checkDraft(draft: DraftFiles): FileIssue[] {
  const html = checkHtml(draft.tpl);
  const css = checkCss(draft.css);
  const subject = subjectFrom(draft.cs);
  const issues = [...html, ...css, ...subject.issues];
  try {
    const value = JSON.parse(draft.ctx) as unknown;
    if (!value || typeof value !== "object" || Array.isArray(value) || !("@context" in value)) {
      issues.push({ tab: "ctx", line: 1, message: 'The file must be one object holding "@context".' });
    }
  } catch {
    issues.push({
      tab: "ctx",
      line: 1,
      message: "This is not valid JSON. Check for a missing comma, quote or bracket.",
    });
  }

  if (subject.subject) {
    dataFields(draft.tpl).forEach((field) => {
      if (!NAME_RULE.test(field.name)) return;
      if (!Object.prototype.hasOwnProperty.call(subject.subject, field.name)) {
        issues.push({
          tab: "tpl",
          line: lineOf(draft.tpl, field.index),
          message: `data-field="${field.name}" is not in the credentialSubject.`,
        });
      }
      if (!draft.ctx.includes(`"${field.name}"`) && !draft.ctx.includes(field.name)) {
        issues.push({
          tab: "tpl",
          line: lineOf(draft.tpl, field.index),
          message: `data-field="${field.name}": ${field.name} is not defined in the @context.`,
        });
      }
    });
  }
  const order: Record<FileTab, number> = { tpl: 0, css: 1, cs: 2, ctx: 3 };
  return issues.sort((a, b) => order[a.tab] - order[b.tab] || (a.line || 0) - (b.line || 0));
}

/** Keeps a one-for-one field rename in step across the HTML template and @context. */
export function syncRename(previous: DraftFiles, next: DraftFiles, edited: FileTab): DraftFiles {
  if (edited !== "tpl" && edited !== "ctx") return next;
  const before = dataFields(previous.tpl).map((field) => field.name);
  const after = dataFields(next.tpl).map((field) => field.name);
  if (edited === "tpl" && before.length === after.length) {
    const changed = before
      .map((name, index) => (name === after[index] ? null : [name, after[index]]))
      .filter(Boolean) as Array<[string, string]>;
    if (changed.length === 1 && NAME_RULE.test(changed[0][1])) {
      const [from, to] = changed[0];
      return { ...next, cs: renameSubjectKey(next.cs, from, to), ctx: next.ctx.split(from).join(to) };
    }
  }
  return next;
}

function renameSubjectKey(text: string, from: string, to: string): string {
  const parsed = subjectFrom(text);
  if (!parsed.subject || !Object.prototype.hasOwnProperty.call(parsed.subject, from) || to in parsed.subject)
    return text;
  const subject: Subject = {};
  Object.entries(parsed.subject).forEach(([name, entry]) => {
    subject[name === from ? to : name] = entry;
  });
  return JSON.stringify({ credentialSubject: subject }, null, 2);
}

export function previewDocument(draft: DraftFiles): string | null {
  const subject = subjectFrom(draft.cs);
  if (!subject.subject || checkHtml(draft.tpl).length || checkCss(draft.css).length) return null;
  const wrapped = new DOMParser().parseFromString(`<div id="tt-root">${draft.tpl}</div>`, "text/html");
  const root = wrapped.getElementById("tt-root");
  if (!root) return null;
  root.querySelectorAll("script,iframe,object,embed,link,style").forEach((node) => node.remove());
  const fields = [...root.querySelectorAll("[data-field]")];
  fields.forEach((element) => {
    const name = element.getAttribute("data-field") || "";
    const entry = subject.subject?.[name];
    element.textContent = entry && entry.value.trim() ? entry.value : name;
  });
  const css = draft.css.replace(/<\/style/gi, "");
  return `<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:;"><style>${css}</style></head><body>${root.innerHTML}</body></html>`;
}

export function clearedSubject(text: string): string {
  const parsed = subjectFrom(text);
  const subject: Subject = {};
  Object.entries(parsed.subject || {}).forEach(([name, entry]) => {
    subject[name] = { key: entry.key, value: "" };
  });
  return JSON.stringify({ credentialSubject: subject }, null, 2);
}

function crc32(data: Uint8Array): number {
  let crc = ~0;
  for (let i = 0; i < data.length; i += 1) {
    crc ^= data[i];
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
  }
  return ~crc >>> 0;
}

function zipStore(files: Array<{ name: string; data: Uint8Array }>): Blob {
  const encoder = new TextEncoder();
  const locals: Uint8Array[] = [];
  const central: Uint8Array[] = [];
  let offset = 0;
  const now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const day = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  files.forEach((file) => {
    const name = encoder.encode(file.name);
    const crc = crc32(file.data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(8, 0, true);
    local.setUint16(10, time, true);
    local.setUint16(12, day, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, file.data.length, true);
    local.setUint32(22, file.data.length, true);
    local.setUint16(26, name.length, true);
    const localBytes = new Uint8Array(local.buffer);
    locals.push(localBytes, name, file.data);
    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(10, 0, true);
    entry.setUint16(12, time, true);
    entry.setUint16(14, day, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, file.data.length, true);
    entry.setUint32(24, file.data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);
    offset += localBytes.length + name.length + file.data.length;
  });
  const centralSize = central.reduce((total, part) => total + part.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);
  return new Blob([...locals, ...central, new Uint8Array(end.buffer)], { type: "application/zip" });
}

export function downloadZip(documentType: string, draft: DraftFiles): void {
  const slug = /^[a-z0-9-]{1,40}$/.test(documentType) ? documentType : "document";
  const encoder = new TextEncoder();
  const blob = zipStore([
    { name: `${slug}.template.html`, data: encoder.encode(draft.tpl) },
    { name: `${slug}.template.css`, data: encoder.encode(draft.css) },
    { name: "credentialSubject.json", data: encoder.encode(clearedSubject(draft.cs)) },
    { name: "context.json", data: encoder.encode(draft.ctx) },
  ]);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slug}-template.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
