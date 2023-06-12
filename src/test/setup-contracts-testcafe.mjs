import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const ACCOUNT_KEY_2 = "0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879";
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

const MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT = "0xbc08b23e18ae6028be5cd51f1fd7add305bb05448594326240817b7011e243da";

// Prep for minting in token registry
const merkleRootToMint = {
  tokenRegistry: [
    {
      // ebl.json
      merkleRoot: "0xd781801b86ed7bf603c5c6584bd50abab4e59e9c404ee18f3d12f191fea28133",
      ...defaultToken,
    },
    {
      //ebl-endorsement-chain.json
      merkleRoot: MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT,
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

shell.exec(
  `${oaCLI_PATH} title-escrow nominate-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_2} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
);
shell.exec(
  `${oaCLI_PATH} title-escrow endorse-transfer-owner --newBeneficiary ${ADDRESS_EXAMPLE_2} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
);
shell.exec(
  `${oaCLI_PATH} title-escrow change-holder --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} --newHolder ${ADDRESS_EXAMPLE_2} -n local -k ${ACCOUNT_KEY}`
);
shell.exec(
  `${oaCLI_PATH} title-escrow endorse-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_1} --newHolder ${ADDRESS_EXAMPLE_1} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY_2}`
);
shell.exec(
  `${oaCLI_PATH} title-escrow surrender --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
);
shell.exec(
  `${oaCLI_PATH} title-escrow accept-surrendered --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
);

// prep for issuing document store
const merkleRootToIssue = [
  // demo document - local.tt
  "0xd7a0c43098da5bcabd2093f6f1d8c35d6d898a2a0a17d92d3d1bf0c1845aa6a6",
  // invoice-attachments.json
  "0x927c044be8438b3f042ca4edb601269db115a67ae0bf5abeb9ae38695a002d4d",
  // invoice-missing-renderer-url.json
  "0x242a15dad887f54fb4b42f493a3040c2cd323fc4c7355d0e22da613251672da8",
  // invoice.json
  "0x585ba3f8d694a9106486aba524a708c4c8b7a14b2b79929a9ffde64555b3279c",
  // invoice-attachments-dummy.json
  "0xbaa213ff192cca244af07e3f1d1abcf04a0fd3be86a11d2c076bd0fbd1d28d6a",
  // invoice-nested-documents.json
  "0xd3c3d143a5ab4b0f07e88ba71ed384107c170688e7bfaab5e0a06761a2d2bc2c",
  // invoice-obfuscated-document.json
  "0x234b7ce4c0da62206b2fc728c4b2aa8a45640df9deb51463189a9fbe4be4f52a",
  // invoice-qrcode.json
  "0x7a452af00f70214f9c703ea9648ff3a842b6a4631cf685b56830cc814a5b4759",
  // coo-selective-disclosure.json
  "0xa2cbf4dab8c5f48f1cb300c027ca4bcb750952e3a226062f7ec8eebd21ca12ba",
  // invoice-incorrect-renderer-url.json
  "0x3055ab0f29f62b78f8a68a5bd69b78e90753748feae304b56a526e61b4dacef2",
  // invoice-unverified-issuer.json
  "0xb00ff40c107a724fe40c7f7f04e6859da0cea7b9c19887ce1ea02738d59a6cfb",
  // v3/invoice.json
  "0x9e29d92823624e164f1b30b5b2da43f9db1c0347f5ff3b80b576f1a0376de5af",
];

merkleRootToIssue.forEach((hash) => {
  shell.exec(
    `${oaCLI_PATH} document-store issue --address ${DOCUMENT_STORE_ADDRESS} --hash ${hash} -n local -k ${ACCOUNT_KEY}`
  );
});
