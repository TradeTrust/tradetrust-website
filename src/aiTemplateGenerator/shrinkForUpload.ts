import { PDFDocument } from "pdf-lib";
import { UPLOAD_CAP_BYTES } from "./types";

const MAX_PDF_PAGES = 3;
const IMAGE_SCALES = [1, 0.75, 0.5, 0.35, 0.25];
const IMAGE_QUALITIES = [0.82, 0.66, 0.5, 0.38, 0.28];
const PDF_SCALES = [1.2, 1, 0.8, 0.6, 0.45];
const PDF_QUALITIES = [0.7, 0.5, 0.35];

type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (options: { scale: number }) => PdfViewport;
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => { promise: Promise<void> };
};
type PdfDocument = {
  numPages: number;
  getPage: (page: number) => Promise<PdfPage>;
  destroy: () => Promise<void>;
};
type PdfjsModule = {
  getDocument: (src: { data: Uint8Array; disableWorker?: boolean }) => { promise: Promise<PdfDocument> };
};

function fileFromBytes(bytes: Uint8Array, name: string, type: string): File {
  const copy = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(copy).set(bytes);
  return new File([copy], name, { type });
}

function extensionOf(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

function canvasBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("UNREADABLE_FILE"))), "image/jpeg", quality);
  });
}

function drawJpeg(source: CanvasImageSource, sourceWidth: number, sourceHeight: number, scale: number, quality: number): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(sourceWidth * scale));
  canvas.height = Math.max(1, Math.round(sourceHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) return Promise.reject(new Error("UNREADABLE_FILE"));
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvasBlob(canvas, quality);
}

async function shrinkImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  try {
    let smallest: Blob | null = null;
    for (const scale of IMAGE_SCALES) {
      for (const quality of IMAGE_QUALITIES) {
        const blob = await drawJpeg(bitmap, bitmap.width, bitmap.height, scale, quality);
        if (!smallest || blob.size < smallest.size) smallest = blob;
        if (blob.size <= UPLOAD_CAP_BYTES) {
          const base = file.name.replace(/\.[^.]+$/, "") || "document";
          return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
        }
      }
    }
    if (!smallest) throw new Error("UNREADABLE_FILE");
    const base = file.name.replace(/\.[^.]+$/, "") || "document";
    return new File([smallest], `${base}.jpg`, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

async function shrinkPdf(file: File): Promise<File> {
  const pdfjs = (await import("pdfjs-dist/legacy/build/pdf")) as unknown as PdfjsModule;
  const data = new Uint8Array(await file.arrayBuffer());
  const pdf = await pdfjs.getDocument({ data, disableWorker: true }).promise;
  try {
    const count = Math.min(pdf.numPages, MAX_PDF_PAGES);
    let smallest: Uint8Array | null = null;
    for (const scale of PDF_SCALES) {
      for (const quality of PDF_QUALITIES) {
        const rebuilt = await PDFDocument.create();
        for (let pageNumber = 1; pageNumber <= count; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));
          const context = canvas.getContext("2d");
          if (!context) throw new Error("UNREADABLE_FILE");
          await page.render({ canvasContext: context, viewport }).promise;
          const blob = await canvasBlob(canvas, quality);
          const image = await rebuilt.embedJpg(new Uint8Array(await blob.arrayBuffer()));
          const pdfPage = rebuilt.addPage([image.width, image.height]);
          pdfPage.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
        }
        const bytes = await rebuilt.save();
        if (!smallest || bytes.byteLength < smallest.byteLength) smallest = bytes;
        if (bytes.byteLength <= UPLOAD_CAP_BYTES) return fileFromBytes(bytes, file.name, "application/pdf");
      }
    }
    if (!smallest) throw new Error("UNREADABLE_FILE");
    return fileFromBytes(smallest, file.name, "application/pdf");
  } finally {
    await pdf.destroy();
  }
}

/** Leaves a file at or under 4 MB unchanged. A larger PDF, PNG, or JPG is reduced before upload. */
export async function shrinkForUpload(file: File): Promise<File> {
  if (file.size <= UPLOAD_CAP_BYTES) return file;
  const extension = extensionOf(file.name);
  if (extension === ".pdf") return shrinkPdf(file);
  return shrinkImage(file);
}
