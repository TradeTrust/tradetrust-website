import { getIdentityName } from "./index";

it("should get the expected names from resolver", async () => {
  const endpoints = [
    {
      id: "1",
      name: "demo",
      endpoint: "https://demo-resolver.tradetrust.io/identifier/",
    },
  ];

  const resolveIdentityName = async () => {
    const identityName1 = await getIdentityName(endpoints, "0x0103e04ecaa67c4e5a8c6dc1ddda35340e2c6bc8");
    const identityName2 = await getIdentityName(endpoints, "0xCbf8F9AAf7C8C07Cb15Fa32E9E08D8b675c79Bc3");
    expect(identityName1).toEqual("ABC Pte Ltd");
    expect(identityName2).toEqual("Advising Bank");
  };

  await resolveIdentityName();
});
