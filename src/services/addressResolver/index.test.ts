import axios from "axios";
import { getIdentityName } from "./index";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
      endpoint: "https://demo-resolver.tradetrust.io/identifier/",
      apiHeader: "",
      apiKey: "",
    },
  ];

  const resolveIdentityName = async () => {
    const identityName = await getIdentityName(endpoints, "0xA");
    expect(identityName).toEqual("ABC Pte Ltd");
  };

  resolveIdentityName();
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
    },
  ];

  const resolveIdentityName = async () => {
    const identityName = await getIdentityName(endpoints, "0xB");
    expect(identityName).toBe(undefined);
  };

  resolveIdentityName();
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

  const resolveIdentityName = async () => {
    const identityName = await getIdentityName(endpoints, "0xC");
    expect(identityName).toBe(undefined);
  };

  resolveIdentityName();
});
