import shell from "shelljs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";
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

const merkleRootToMint = {
  tokenRegistry: [
    {
      // Endorse Owner
      merkleRoot: "0x69f86e95549d3bd5768fb6bbbea5ed7232856a43fe8ae96df4d000d1a5125637",
      ...defaultToken,
    },
    {
      // Nominate Owner
      ...defaultToken,
      merkleRoot: "0xd352ab5e4a8a736ecce02d37842ff45721e138b08789e5231cca1e1b6794b3f4",
      holder: ADDRESS_EXAMPLE_2,
    },
    {
      // Surrender
      merkleRoot: "0x84be0d43bb6e6e36c3dff96b0619737e18b116bf2a9ed229ba266057516c3bfa",
      ...defaultToken,
    },
    {
      // Transfer Holder
      merkleRoot: "0x55f73a6a83243410b45929e53cc84327c2d24cb78f96200748590d3ec54fa099",
      ...defaultToken,
    },
  ],
};

shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n local -k ${ACCOUNT_KEY}`);

shell.exec(
  `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n local -k ${ACCOUNT_KEY} --factory-address ${TITLE_ESCROW_FACTORY_ADDRESS} --standalone`
);

merkleRootToMint.tokenRegistry.forEach((element) => {
  shell.exec(
    `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
  );
});
