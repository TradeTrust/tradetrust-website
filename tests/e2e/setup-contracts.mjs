import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
// const TOKEN_REGISTRY_ADDRESS = "0xf18CD26780B6D3589371fb0b3fE8E2a513D6Fdc6"; // Pre-deployed on goerli using token-registry or oa-cli
const TOKEN_REGISTRY_ADDRESS = "0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953";
const DOCUMENT_STORE_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";
const ADDRESS_EXAMPLE_3 = "0x391aFf3942857a10958425FebF1fC1938D9F5AE7";

const oaCLI_PATH = "open-attestation";

export const contractAddress = {
  TitleEscrowFactory: "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF",
  Deployer: "0x9eBC30E7506E6Ce36eAc5507FCF0121BaF7AeA57",
  TokenImplementation: "0xE5C75026d5f636C89cc77583B6BCe7C99F512763",
};

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
      merkleRoot: "0x5759d368034cd5a316178344b66eb511f10edf4bd5d633dd1c8862a647fc6f4b",
      ...defaultToken,
    },
    {
      // Nominate Owner
      ...defaultToken,
      merkleRoot: "0xfc4271d1fe0219bc76b693f9e9f9808264800c54c69502988491455499c15188",
      holder: ADDRESS_EXAMPLE_2,
    },
    {
      // Surrender
      merkleRoot: "0xb969686a6bbd635f02b7c0073ac4a787ee54f93c2feaf94ea600dc0b798aa574",
      ...defaultToken,
    },
    {
      // Transfer Holder
      merkleRoot: "0x3a7436eac11bb9a98f75de7743e70e99b4f1a2625b372449b83979cf8e9b5183",
      ...defaultToken,
    },
  ],
};

shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);

shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n local -k ${ACCOUNT_KEY}`);

shell.exec(
  `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n local -k ${ACCOUNT_KEY} --factory-address ${contractAddress.TitleEscrowFactory} --standalone`
);

merkleRootToMint.tokenRegistry.forEach((element) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});

// shell.exec(
//   `${oaCLI_PATH} title-escrow nominate-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_3} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId 0xfc4271d1fe0219bc76b693f9e9f9808264800c54c69502988491455499c15188 -n local -k ${ACCOUNT_KEY}`
// );
