import { shrinkForUpload } from "./shrinkForUpload";
import { UPLOAD_CAP_BYTES } from "./types";

describe("shrinkForUpload", () => {
  it("leaves a file under 4 MB unchanged", async () => {
    const file = new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], "scan.png", { type: "image/png" });
    await expect(shrinkForUpload(file)).resolves.toBe(file);
    expect(UPLOAD_CAP_BYTES).toBe(4 * 1024 * 1024);
  });
});