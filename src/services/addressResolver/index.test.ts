import axios from "axios";
import { getIdentityName, getPath } from "./index";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnThis();

describe("getIdentityName", () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });
  it("should return the first name if it can be found with any resolver", async () => {
    mockedAxios.get.mockResolvedValueOnce(
      Promise.resolve({
        data: {
          identity: {
            identifier: "0xA",
            name: "ABC Pte Ltd",
            remarks: "Added by Raymond",
          },
        },
      })
    );

    const endpoints = [
      {
        id: "1",
        name: "demo",
        endpoint: "https://demo-resolver.tradetrust.io/",
        apiHeader: "",
        apiKey: "",
        path: {
          addressResolution: "/identifier",
        },
      },
    ];

    const identityName = await getIdentityName(endpoints, "0xA");
    expect(identityName).toEqual({ result: "ABC Pte Ltd", source: "demo" });
  });

  it("should return undefined if it cannot be resolved anywhere", async () => {
    mockedAxios.get.mockResolvedValueOnce(
      Promise.reject({
        data: {
          message: "No profile found for 0xB",
        },
      })
    );

    const endpoints = [
      {
        id: "1",
        name: "demo",
        endpoint: "https://demo-resolver.tradetrust.io/identifier/",
        apiHeader: "",
        apiKey: "",
        path: {
          addressResolution: "/identifier",
        },
      },
    ];

    const identityName = await getIdentityName(endpoints, "0xB");
    expect(identityName).toBe(undefined);
  });

  it("should return undefined with empty resolver list", async () => {
    mockedAxios.get.mockResolvedValueOnce(
      Promise.reject({
        data: {
          message: "No profile found for 0xC",
        },
      })
    );

    const endpoints: ThirdPartyAPIEntryProps[] = [];

    const identityName = await getIdentityName(endpoints, "0xC");
    expect(identityName).toBe(undefined);
  });

  it("should work for url with trailing slashes", async () => {
    mockedAxios.get.mockResolvedValueOnce(
      Promise.resolve({
        data: {
          identity: {
            identifier: "0xA",
            name: "ABC Pte Ltd",
            remarks: "Added by Raymond",
          },
        },
      })
    );

    const endpoints = [
      {
        id: "1",
        name: "demo",
        endpoint: "https://demo-resolver.tradetrust.io/",
        apiHeader: "",
        apiKey: "",
        path: {
          addressResolution: "/identifier/",
        },
      },
    ];

    const identityName = await getIdentityName(endpoints, "0xA");
    expect(mockedAxios.get.mock.calls[0][0]).toBe("https://demo-resolver.tradetrust.io/identifier/0xA");
    expect(identityName).toEqual({ result: "ABC Pte Ltd", source: "demo" });
  });
});

describe("getPath", () => {
  it("should return url resolved from the base url", () => {
    expect(getPath("/bark", "https://cow.com/chicken")).toBe("https://cow.com/bark");
    expect(getPath("bark", "https://cow.com/")).toBe("https://cow.com/bark");
    expect(getPath("/second/level", "https://cow.com/")).toBe("https://cow.com/second/level");
  });
});
