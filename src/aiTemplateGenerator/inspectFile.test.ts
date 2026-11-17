import { inspectFile } from "./inspectFile";
import { MAX_FILE_BYTES } from "./types";

function fileWithBytes(name: string, bytes: number[], type: string): File {
  return new File([new Uint8Array(bytes)], name, { type });
}

describe("inspectFile", () => {
  it("accepts a PDF, PNG and JPG within 10 MB", async () => {
    await expect(inspectFile(fileWithBytes("cert.pdf", [0x25, 0x50, 0x44, 0x46], "application/pdf"))).resolves.toBeNull();
    await expect(
      inspectFile(fileWithBytes("scan.png", [0x89, 0x50, 0x4e, 0x47], "image/png"))
    ).resolves.toBeNull();
    await expect(inspectFile(fileWithBytes("scan.jpg", [0xff, 0xd8, 0xff], "image/jpeg"))).resolves.toBeNull();
  });

  it("rejects the wrong type, an oversized file and an unreadable file", async () => {
    await expect(inspectFile(fileWithBytes("notes.txt", [1, 2, 3], "text/plain"))).resolves.toBe("INVALID_FILE_TYPE");

    const oversized = fileWithBytes("cert.pdf", [0x25, 0x50, 0x44, 0x46], "application/pdf");
    Object.defineProperty(oversized, "size", { value: MAX_FILE_BYTES + 1 });
    await expect(inspectFile(oversized)).resolves.toBe("FILE_TOO_LARGE");

    await expect(inspectFile(fileWithBytes("cert.pdf", [1, 2, 3, 4], "application/pdf"))).resolves.toBe(
      "UNREADABLE_FILE"
    );
    await expect(inspectFile(new File([], "empty.pdf", { type: "application/pdf" }))).resolves.toBe("UNREADABLE_FILE");
  });
});
