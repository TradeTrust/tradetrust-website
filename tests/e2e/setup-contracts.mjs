import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const TOKEN_REGISTRY_ADDRESS = "0x9E1b69b5ceA6bD860b55dBE3adbF6CDEfcF5DDb1";
const DOCUMENT_STORE_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04"
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";
const ADDRESS_EXAMPLE_3 = "0x391aFf3942857a10958425FebF1fC1938D9F5AE7";

const oaCLI_PATH = "/Users/puayhiang/dev/open-attestation-cli/dist/@govtechsg/open-attestation-cli-macos"
export const contractAddress = {
  TitleEscrowFactory: "0x878A327daA390Bc602Ae259D3A374610356b6485",
  Deployer: "0x9eBC30E7506E6Ce36eAc5507FCF0121BaF7AeA57",
  TokenImplementation: "0xE5C75026d5f636C89cc77583B6BCe7C99F512763",
};

const defaultTR = {
  accountKey: ACCOUNT_KEY,
  tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
  owner: ADDRESS_EXAMPLE_1,
  holder: ADDRESS_EXAMPLE_1,
}

const merkleRootToMint = {
  tokenRegistry: [{
    // Endorse Owner
    merkleRoot: "0xd553a5111f4fbcc72cc13b9fbac83095de69d1b28c8e537103fcc0f9269694c8",
    ...defaultTR,
  },{
    // Nominate Owner
    merkleRoot: "0x412adfdab92321e666fe14cf07609bcfc261e944f5594a445e0aad218c0220d1",
    ...defaultTR,
  },{
    // Surrender
    merkleRoot: "0xec7e1e3bc099266d73f421b6c97892e380ac052affce0dc1e9ceca08e756864a",
    ...defaultTR,
  },{
    // Transfer Holder
    merkleRoot: "0x83fc0f0b37a6179253377946b0cd05524d788b5d2f9c1032200b4c345f8d7417",
    ...defaultTR,
  },],
}

shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);  
shell.exec(`${oaCLI_PATH} deploy token-registry "My Token Registry" MTR -n local -k ${ACCOUNT_KEY} --factory-address ${contractAddress.TitleEscrowFactory} --token-implementation-address ${contractAddress.TokenImplementation} --deployer-address ${contractAddress.Deployer}`);

merkleRootToMint.tokenRegistry.forEach(element => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});

shell.exec(
  `${oaCLI_PATH} title-escrow nominate-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_3} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${"0xd553a5111f4fbcc72cc13b9fbac83095de69d1b28c8e537103fcc0f9269694c8"} -n local -k ${ACCOUNT_KEY}`
);