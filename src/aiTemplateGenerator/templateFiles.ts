import { TemplateField, TemplateFiles } from "./generate";

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
  cs: 'The credentialSubject is an object. Each property name is a data-field from the HTML template, and each value is { "key", "value" }. key is the label printed on the document and value is the text copied from it. A signature value is the same data:image base64 URL used on its img. Change a value and the preview above changes. The download keeps these values.',
  ctx: "The @context. Every field name in the HTML template must be defined here. Rename a term here and the HTML template follows.",
};

/** Puts each tag on its own indented line so a minified template is readable in the editor. */
export function formatMarkup(source: string): string {
  const text = source.replace(/\r\n/g, "\n").trim();
  if (!text.includes("<")) return text;
  const tokens = text.match(/<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g);
  if (!tokens || tokens.length < 2) return text;
  const lines: string[] = [];
  let depth = 0;
  tokens.forEach((token) => {
    const trimmed = token.replace(/\s+/g, " ").trim();
    if (!trimmed) return;
    if (trimmed.startsWith("</")) depth = Math.max(0, depth - 1);
    lines.push(`${"  ".repeat(depth)}${trimmed}`);
    if (trimmed.startsWith("<") && !trimmed.startsWith("</") && !trimmed.startsWith("<!--")) {
      const name = /^<([a-zA-Z][\w-]*)/.exec(trimmed)?.[1]?.toLowerCase() || "";
      if (!VOID_TAGS.has(name) && !/\/>$/.test(trimmed)) depth += 1;
    }
  });
  return lines.join("\n");
}

/** Breaks a minified stylesheet into one declaration per line. */
export function formatStylesheet(source: string): string {
  const text = source.replace(/\r\n/g, "\n").trim();
  if (!text) return "";
  const lines: string[] = [];
  let depth = 0;
  let buffer = "";
  let index = 0;
  const push = (value: string) => {
    const chunk = value.trim();
    if (chunk) lines.push(`${"  ".repeat(depth)}${chunk}`);
  };
  while (index < text.length) {
    if (text.startsWith("/*", index)) {
      const end = text.indexOf("*/", index + 2);
      const comment = text.slice(index, end === -1 ? text.length : end + 2);
      push(buffer);
      buffer = "";
      push(comment.replace(/\s+/g, " ").trim());
      index += comment.length;
      continue;
    }
    const quote = text[index];
    if (quote === '"' || quote === "'") {
      const end = text.indexOf(quote, index + 1);
      const literal = text.slice(index, end === -1 ? text.length : end + 1);
      buffer += literal;
      index += literal.length;
      continue;
    }
    const char = text[index];
    if (char === "{") {
      push(`${buffer.trim()} {`);
      buffer = "";
      depth += 1;
    } else if (char === "}") {
      const pending = buffer.trim();
      if (pending) push(pending.includes(":") && !pending.endsWith(";") ? `${pending};` : pending);
      buffer = "";
      depth = Math.max(0, depth - 1);
      lines.push(`${"  ".repeat(depth)}}`);
    } else if (char === ";") {
      push(`${buffer};`);
      buffer = "";
    } else {
      buffer += char;
    }
    index += 1;
  }
  push(buffer);
  return lines
    .map((line) => {
      const body = line.trim();
      if (!body.endsWith(";") || body.includes("{")) return line;
      const split = body.indexOf(":");
      if (split === -1) return line;
      const indent = line.match(/^\s*/)?.[0] ?? "";
      return `${indent}${body.slice(0, split).trim()}: ${body.slice(split + 1, -1).trim()};`;
    })
    .join("\n");
}

/** Formats the file open in one editor. Invalid JSON is returned unchanged. */
export function prettifyFile(tab: FileTab, source: string): string {
  if (tab === "tpl") return formatMarkup(source);
  if (tab === "css") return formatStylesheet(source);
  try {
    return JSON.stringify(JSON.parse(source), null, 2);
  } catch {
    return source;
  }
}

export function draftFromFiles(files: TemplateFiles): DraftFiles {
  return {
    tpl: formatMarkup(files.template),
    css: formatStylesheet(files.stylesheet),
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

type ContextTerm = { "@id"?: string; "@type"?: string };

function uniqueNames(names: string[]): string[] {
  return names.filter((name, index) => name.length > 0 && names.indexOf(name) === index);
}

/** One name replaced by one other name. An invalid new name is not a rename. */
function singleSwap(before: string[], after: string[]): [string, string] | "invalid" | null {
  const removed = before.filter((name) => !after.includes(name));
  const added = after.filter((name) => !before.includes(name));
  if (removed.length !== 1 || added.length !== 1) return null;
  if (!NAME_RULE.test(added[0]) || before.includes(added[0])) return "invalid";
  return [removed[0], added[0]];
}

function replaceDataField(html: string, from: string, to: string): string {
  return html.replace(new RegExp(`(data-field\\s*=\\s*")${from}(")`, "g"), `$1${to}$2`);
}

function readTerms(text: string): Record<string, ContextTerm> | null {
  try {
    const value = JSON.parse(text) as { "@context"?: { Document?: { "@context"?: unknown } } };
    const terms = value["@context"]?.Document?.["@context"];
    if (!terms || typeof terms !== "object" || Array.isArray(terms)) return null;
    return { ...(terms as Record<string, ContextTerm>) };
  } catch {
    return null;
  }
}

function writeTerms(text: string, terms: Record<string, ContextTerm>): string {
  const value = JSON.parse(text) as { "@context": { Document: { "@context": Record<string, ContextTerm> } } };
  value["@context"].Document["@context"] = terms;
  return JSON.stringify(value, null, 2);
}

function renameTerm(terms: Record<string, ContextTerm>, from: string, to: string): Record<string, ContextTerm> | null {
  if (!Object.prototype.hasOwnProperty.call(terms, from) || Object.prototype.hasOwnProperty.call(terms, to)) return null;
  const next: Record<string, ContextTerm> = {};
  Object.entries(terms).forEach(([name, term]) => {
    if (name !== from) {
      next[name] = term;
      return;
    }
    const id = typeof term["@id"] === "string" && term["@id"].endsWith(`:${from}`) ? `${term["@id"].slice(0, -from.length)}${to}` : term["@id"];
    next[to] = { ...term, "@id": id };
  });
  return next;
}

function withRenamedKey(files: DraftFiles, from: string, to: string, edited: FileTab): DraftFiles {
  const next = { ...files };
  if (edited !== "tpl") next.tpl = replaceDataField(files.tpl, from, to);
  if (edited !== "cs") next.cs = renameSubjectKey(files.cs, from, to);
  if (edited !== "ctx") {
    const terms = readTerms(files.ctx);
    const renamed = terms ? renameTerm(terms, from, to) : null;
    if (renamed) next.ctx = writeTerms(files.ctx, renamed);
  }
  return next;
}

function addField(files: DraftFiles, name: string): DraftFiles {
  const parsed = subjectFrom(files.cs);
  const terms = readTerms(files.ctx);
  const next = { ...files };
  if (parsed.subject && parsed.issues.length === 0 && !parsed.subject[name]) {
    next.cs = JSON.stringify(
      { credentialSubject: { ...parsed.subject, [name]: { key: name, value: "" } } },
      null,
      2
    );
  }
  if (terms && !terms[name]) {
    terms[name] = { "@id": `doc:${name}`, "@type": "xsd:string" };
    next.ctx = writeTerms(files.ctx, terms);
  }
  return next;
}

function removeField(files: DraftFiles, name: string): DraftFiles {
  const parsed = subjectFrom(files.cs);
  const terms = readTerms(files.ctx);
  const next = { ...files };
  if (parsed.subject && parsed.issues.length === 0 && Object.hasOwn(parsed.subject, name)) {
    const subject = { ...parsed.subject };
    delete subject[name];
    next.cs = JSON.stringify({ credentialSubject: subject }, null, 2);
  }
  if (terms && Object.hasOwn(terms, name)) {
    delete terms[name];
    next.ctx = writeTerms(files.ctx, terms);
  }
  return next;
}

function applyNameChange(next: DraftFiles, before: string[], after: string[], edited: FileTab): DraftFiles {
  const swap = singleSwap(before, after);
  if (swap === "invalid" || !swap) {
    if (edited !== "tpl" || swap === "invalid") return next;
    const added = after.filter((name) => NAME_RULE.test(name) && !before.includes(name));
    const removed = before.filter((name) => NAME_RULE.test(name) && !after.includes(name));
    let draft = next;
    added.forEach((name) => {
      draft = addField(draft, name);
    });
    removed.forEach((name) => {
      draft = removeField(draft, name);
    });
    return draft;
  }
  return withRenamedKey(next, swap[0], swap[1], edited);
}

function namesIn(kind: "cs" | "ctx", text: string): string[] | null {
  if (kind === "cs") {
    const subject = subjectFrom(text).subject;
    return subject ? Object.keys(subject) : null;
  }
  const terms = readTerms(text);
  return terms ? Object.keys(terms) : null;
}

/** Keeps a field rename, addition, or removal in step across the HTML template, credentialSubject and @context. */
export function syncRename(previous: DraftFiles, next: DraftFiles, edited: FileTab): DraftFiles {
  if (edited === "css") return next;
  if (edited === "tpl") {
    return applyNameChange(
      next,
      uniqueNames(dataFields(previous.tpl).map((field) => field.name)),
      uniqueNames(dataFields(next.tpl).map((field) => field.name)),
      "tpl"
    );
  }
  const kind = edited === "cs" ? "cs" : "ctx";
  const before = namesIn(kind, previous[kind]);
  const after = namesIn(kind, next[kind]);
  if (!before || !after) return next;
  return applyNameChange(next, before, after, edited);
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

export type PreviewFieldCard = { name: string; label: string; value: string };

export type PreviewGroup = { name: string; fields: PreviewFieldCard[] };

export type GeneratedPreview = {
  title: string;
  subtitle: string | null;
  groups: PreviewGroup[];
};

function plainText(element: Element): string {
  return (element.textContent || "").replace(/\s+/g, " ").trim();
}

function humanizeDocumentType(value: string): string {
  const cleaned = value.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  if (!cleaned) return "Document";
  if (/[A-Z]/.test(cleaned) && cleaned.includes(" ")) return cleaned;
  return cleaned.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

/** Field cards for the Check & rename preview, in template order, grouped like the design. */
export function generatedPreview(
  draft: DraftFiles,
  source: { documentType: string; template: string; fields: TemplateField[] }
): GeneratedPreview | null {
  const parsed = subjectFrom(draft.cs);
  if (!parsed.subject || checkHtml(draft.tpl).length || checkCss(draft.css).length) return null;
  const wrapped = new DOMParser().parseFromString(`<div id="tt-root">${draft.tpl}</div>`, "text/html");
  const root = wrapped.getElementById("tt-root");
  if (!root) return null;

  const titleNode = Array.from(root.querySelectorAll("h1")).find((node) => !node.querySelector("[data-field]"));
  const title = titleNode ? plainText(titleNode) : humanizeDocumentType(source.documentType);
  const subtitleNode = titleNode?.nextElementSibling;
  const subtitle =
    subtitleNode &&
    !subtitleNode.querySelector("[data-field]") &&
    !/^H[1-6]$/.test(subtitleNode.tagName) &&
    plainText(subtitleNode).length > 0 &&
    plainText(subtitleNode).length < 160
      ? plainText(subtitleNode)
      : null;

  const headingFor = new Map<string, string>();
  let heading = "";
  root.querySelectorAll("h2,h3,h4,[data-field]").forEach((element) => {
    if (element.hasAttribute("data-field")) {
      const name = element.getAttribute("data-field") || "";
      if (name && !headingFor.has(name)) headingFor.set(name, heading);
      return;
    }
    heading = plainText(element);
  });

  const originalNames = dataFields(source.template).map((field) => field.name);
  const currentNames = dataFields(draft.tpl).map((field) => field.name);
  const groupByName = new Map(source.fields.map((field) => [field.name, field.group]));
  const seen = new Set<string>();
  const groups: PreviewGroup[] = [];
  const byGroup = new Map<string, PreviewGroup>();

  currentNames.forEach((name, index) => {
    if (!NAME_RULE.test(name) || seen.has(name) || !parsed.subject?.[name]) return;
    seen.add(name);
    const renamedFrom = originalNames.length === currentNames.length ? originalNames[index] : name;
    const groupName = (groupByName.get(name) || groupByName.get(renamedFrom) || headingFor.get(name) || "").trim();
    let group = byGroup.get(groupName);
    if (!group) {
      group = { name: groupName, fields: [] };
      byGroup.set(groupName, group);
      groups.push(group);
    }
    const entry = parsed.subject[name];
    group.fields.push({ name, label: entry.key, value: entry.value.trim() ? entry.value : name });
  });

  return { title: title || humanizeDocumentType(source.documentType), subtitle, groups };
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
    const value = entry && entry.value.trim() ? entry.value : "";
    if (element.tagName === "IMG") {
      if (value.startsWith("data:image/")) element.setAttribute("src", value);
      return;
    }
    element.textContent = value || name;
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
    { name: "credentialSubject.json", data: encoder.encode(draft.cs) },
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
