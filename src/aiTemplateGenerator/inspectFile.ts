import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_BYTES, Step1ErrorCode } from "./types";

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

function readHead(file: File, length: number): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("unreadable"));
    reader.onload = () => {
      if (!(reader.result instanceof ArrayBuffer)) {
        reject(new Error("unreadable"));
        return;
      }
      resolve(new Uint8Array(reader.result));
    };
    reader.readAsArrayBuffer(file.slice(0, length));
  });
}

function matchesSignature(bytes: Uint8Array, extension: string): boolean {
  if (extension === ".pdf") {
    return bytes.length >= 4 && String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === "%PDF";
  }
  if (extension === ".png") {
    return bytes.length >= 4 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }
  return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
}

export async function inspectFile(file: File): Promise<Step1ErrorCode | null> {
  const extension = extensionOf(file.name);
  if (!(ACCEPTED_FILE_EXTENSIONS as readonly string[]).includes(extension)) return "INVALID_FILE_TYPE";
  if (file.size > MAX_FILE_BYTES) return "FILE_TOO_LARGE";
  if (file.size === 0) return "UNREADABLE_FILE";
  try {
    const head = await readHead(file, 8);
    if (!matchesSignature(head, extension)) return "UNREADABLE_FILE";
  } catch {
    return "UNREADABLE_FILE";
  }
  return null;
}
