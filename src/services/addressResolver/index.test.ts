import axios from "axios";
import { getIdentityName, getPath, getFeatures } from "./index";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnThis();

beforeEach(() => {
  mockedAxios.get.mockReset();
});

describe("getIdentityName", () => {
  it("should return the first name if it can be found with any resolver", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        identity: {
          identifier: "0xA",
          name: "ABC Pte Ltd",
          remarks: "Added by Raymond",
        },
      },
    });

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
    mockedAxios.get.mockRejectedValueOnce({
      data: {
        message: "No profile found for 0xB",
      },
    });

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
    mockedAxios.get.mockRejectedValueOnce({
      data: {
        message: "No profile found for 0xC",
      },
    });

    const endpoints: ThirdPartyAPIEntryProps[] = [];

    const identityName = await getIdentityName(endpoints, "0xC");
    expect(identityName).toBe(undefined);
  });

  it("should work for url with trailing slashes", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        identity: {
          identifier: "0xA",
          name: "ABC Pte Ltd",
          remarks: "Added by Raymond",
        },
      },
    });

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

describe("getFeatures", () => {
  it("should return the features data when successful", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        features: {
          addressResolution: {
            location: "/identifier",
          },
          entityLookup: {
            location: "/search",
          },
        },
      },
    });
    const res = await getFeatures("https://some.url", "", "");
    expect(res).toEqual({
      features: {
        addressResolution: { location: "/identifier" },
        entityLookup: { location: "/search" },
      },
    });
    expect(mockedAxios.get).toBeCalledWith("https://some.url");
  });
  it("should include the api headers when its provided", async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        features: {
          addressResolution: {
            location: "/identifier",
          },
          entityLookup: {
            location: "/search",
          },
        },
      },
    });
    const res = await getFeatures("https://some.url", "key", "value");
    expect(res).toEqual({
      features: {
        addressResolution: { location: "/identifier" },
        entityLookup: { location: "/search" },
      },
    });
    expect(mockedAxios.get).toBeCalledWith("https://some.url", { headers: { key: "value" } });
  });
  it("should throw message returned from the api whenever possible", async () => {
    const e: any = new Error("Generic error message");
    e.response = { data: { message: "Some known error from server" } };
    mockedAxios.get.mockRejectedValueOnce(e);
    await expect(() => getFeatures("https://some.url", "key", "value")).rejects.toThrow(/Some known error from server/);
  });
  it("should throw generic error message when message is not available", async () => {
    const e = new Error("Generic error message");
    mockedAxios.get.mockRejectedValueOnce(e);
    await expect(() => getFeatures("https://some.url", "key", "value")).rejects.toThrow(/Generic error message/);
  });
});
