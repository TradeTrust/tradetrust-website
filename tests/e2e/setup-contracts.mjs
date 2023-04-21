import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const TOKEN_REGISTRY_ADDRESS = "0xf18CD26780B6D3589371fb0b3fE8E2a513D6Fdc6"; // Pre-deployed on goerli using token-registry or oa-cli
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60";

const oaCLI_PATH = "open-attestation";

const defaultToken = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
};

const merkleRootToMint = {
  tokenRegistry: [
    {
      // Endorse Owner
      merkleRoot: "0xf82cf3c92462175888eda124a5227e0a46344ba09650e4ef85015d97e342251a",
      ...defaultToken,
    },
    {
      // Nominate Owner
      merkleRoot: "0x764fb454298834edfdb2d169f8397d7a6e4c4b997f872e6a0808e4a2e2bdb00e",
      ...defaultToken,
      holder: ADDRESS_EXAMPLE_2,
    },
    {
      // Surrender
      merkleRoot: "0xfb4a84f4b9e8e28c552eab1d94f5d4a831584082478f9fa83a2e8aac61e07c4a",
      ...defaultToken,
    },
    {
      // Transfer Holder
      merkleRoot: "0x1c92119b530b5028e8cb45e74624a5f52a1ae84d68e1c165776813a84722807a",
      ...defaultToken,
    },
  ],
};

merkleRootToMint.tokenRegistry.forEach((element) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});

