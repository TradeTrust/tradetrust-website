import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";
const DOCUMENT_STORE_ADDRESS = "0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953";
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";

const oaCLI_PATH = "open-attestation";

const TITLE_ESCROW_FACTORY_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";

const defaultToken = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
};

// Prep for minting in token registry
const merkleRootToMint = {
  tokenRegistry: [
    {
      // Endorse Owner
      merkleRoot: "0x80d8454e62cf2a68158f590b05d058b6c8f495bdecd7393bb64fa95f647c4d73",
      ...defaultToken,
    },
    {
      // Nominate Owner
      ...defaultToken,
      merkleRoot: "0x31f63da7bbdb1fe5af64e2302e0e0fe0e3e118d4176845f2ce30240ac58ce6ef",
      holder: ADDRESS_EXAMPLE_2,
    },
    {
      // Surrender
      merkleRoot: "0xe4f6e95c6b3a7ea69b04b4e2771debbb884db69e07fc788749d4fe433dd54ded",
      ...defaultToken,
    },
    {
      // Transfer Holder
      merkleRoot: "0x32e4fdcccd92061b4df9e5de1393cbb5f2219abb1f632304aea102fcefa619d4",
      ...defaultToken,
    },
  ],
};

shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n local -k ${ACCOUNT_KEY}`);

shell.exec(
  `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n local -k ${ACCOUNT_KEY} --factory-address ${TITLE_ESCROW_FACTORY_ADDRESS} --standalone`
);

shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);

merkleRootToMint.tokenRegistry.forEach((element) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});

// prep for issuing document store
const merkleRootToIssue = [
  // demo document - local.tt
  "0xd7a0c43098da5bcabd2093f6f1d8c35d6d898a2a0a17d92d3d1bf0c1845aa6a6",
  // invoice-attachments.json
  "0x06d444855497806c5e5019bedd401b7d7c4d35a7bd30e7a0ddca8bb0b6814dd8",
  // invoice-missing-renderer-url.json
  "0x1fb37a244ded749f0bcb3c8c117cac6334eec742bea8a7a839662ba286c6fa98",
];

merkleRootToIssue.forEach((hash) => {
  shell.exec(
    `${oaCLI_PATH} document-store issue --address ${DOCUMENT_STORE_ADDRESS} --hash ${hash} -n local -k ${ACCOUNT_KEY}`
  );
});
