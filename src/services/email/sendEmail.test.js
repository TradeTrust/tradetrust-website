import { sendEmail } from "./sendEmail";
import { EMAIL_API_URL } from "../../config";

jest.spyOn(window, "fetch").mockImplementation(() =>
  Promise.resolve({
    status: 200,
    json: Promise.resolve("yes"),
  })
);

describe("sagas/certificate", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  const email = "admin@opencerts.io";
  const captcha = "ABCD";
  const certificate = { some: "data" };

  it("calls window.fetch with right args", async () => {
    await sendEmail({ certificate, captcha, email });
    expect(fetch).toHaveBeenCalledWith(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: certificate,
        to: email,
        captcha,
      }),
    });
  });

  it("resolves when 200 is returned", async () => {
    const res = await sendEmail({ certificate, captcha, email });
    expect(res).toBe(true);
  });

  it("rejects when non-200 code is returned", async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ status: 400 }));
    const res = await sendEmail({ certificate, captcha, email });
    expect(res).toBe(false);
  });
});
