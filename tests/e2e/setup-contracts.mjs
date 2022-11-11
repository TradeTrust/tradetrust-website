import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";
const DOCUMENT_STORE_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04"
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";
const ADDRESS_EXAMPLE_3 = "0x391aFf3942857a10958425FebF1fC1938D9F5AE7";

const oaCLI_PATH = "open-attestation-cli-macos"
export const contractAddress = {
  TitleEscrowFactory: "0x878A327daA390Bc602Ae259D3A374610356b6485",
  Deployer: "0x9eBC30E7506E6Ce36eAc5507FCF0121BaF7AeA57",
  TokenImplementation: "0xE5C75026d5f636C89cc77583B6BCe7C99F512763",
};

const defaultToken = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
}

const merkleRootToMint = {
  tokenRegistry: [{
    // Endorse Owner
    merkleRoot: "0xaf81307bb0c895c2c2d274f7e5d029c94a0d07450bc46182571e2329eef46cda",
    ...defaultToken,
  },{
    // Nominate Owner
    merkleRoot: "0xe104b77c5b20bb76d59a2b04c4af96ed61f2599b23e6eef69d3aab1326aed09e",
    ...defaultToken,
  },{
    // Surrender
    merkleRoot: "0xe7a6ff6c1ba177af0f8e8ce2060a7776521e98676e0243394bbae30e3070a70a",
    ...defaultToken,
  },{
    // Transfer Holder
    merkleRoot: "0xc6cd2084b73712759dd0a41e0ade43ead7dad4f43c5a193d33b46aad1c4e8104",
    ...defaultToken,
  },],
}

shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);  

merkleRootToMint.tokenRegistry.forEach(element => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});

shell.exec(
  `${oaCLI_PATH} title-escrow nominate-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_3} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${"0xaf81307bb0c895c2c2d274f7e5d029c94a0d07450bc46182571e2329eef46cda"} -n local -k ${ACCOUNT_KEY}`
);