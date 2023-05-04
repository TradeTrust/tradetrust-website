import shell from "shelljs";
import fetch from "node-fetch";
import fs from "fs";

const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
// const TOKEN_REGISTRY_ADDRESS = "0xf18CD26780B6D3589371fb0b3fE8E2a513D6Fdc6"; // Pre-deployed on goerli using token-registry or oa-cli
const TOKEN_REGISTRY_ADDRESS = "0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953";
const DOCUMENT_STORE_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";
const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";
const ADDRESS_EXAMPLE_3 = "0x391aFf3942857a10958425FebF1fC1938D9F5AE7";

const sandBoxEndpoint = "https://sandbox.openattestation.com";

const request = (url, options) => {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`unexpected response ${response.statusText}`);
      }
      return response;
    })
    .then((response) => response.json());
};

const requestDnsSandbox = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address: ACCOUNT_KEY, networkId: "1337" }),
  };
  try {
    const { executionId } = await request(sandBoxEndpoint, options);
    const { name } = await request(`${sandBoxEndpoint}/execution/${executionId}`);
    return name;
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

const updateDocument = async (error, data, writePath) => {
  if (error) throw error;
  const dns = await requestDnsSandbox();
  const jsonData = JSON.parse(data);
  jsonData.openAttestationMetadata.identityProof.identifier = dns;

  const updatedJsonData = JSON.stringify(jsonData);

  if (!fs.existsSync("./tests/e2e/fixtures/unwrapped")) {
    fs.mkdirSync("./tests/e2e/fixtures/unwrapped");
  }

  fs.writeFile(writePath, updatedJsonData, "utf-8", (error) => {
    if (error) throw error;
  });
};

// update unwrapped ebl-endorse-owner with new dns that is created by oa-cli dns sandbox
const eblEndorseOwnerTemplatePath = "./tests/e2e/fixtures/template/ebl-endorse-owner.json";
const eblEndorseOwnerUnwrappedPath = "./tests/e2e/fixtures/unwrapped/ebl-endorse-owner.json";
fs.readFile(eblEndorseOwnerTemplatePath, "utf-8", async (error, data) => {
  await updateDocument(error, data, eblEndorseOwnerUnwrappedPath);
});

// update unwrapped ebl-nominate-owner with new dns that is created by oa-cli dns sandbox
const eblNominateOwnerTemplatePath = "./tests/e2e/fixtures/template/ebl-nominate-owner.json";
const eblNominateOwnerUnwrappedPath = "./tests/e2e/fixtures/unwrapped/ebl-nominate-owner.json";
fs.readFile(eblNominateOwnerTemplatePath, "utf-8", async (error, data) => {
  await updateDocument(error, data, eblNominateOwnerUnwrappedPath);
});

// update unwrapped ebl-surrender with new dns that is created by oa-cli dns sandbox
const eblSurrenderTemplatePath = "./tests/e2e/fixtures/template/ebl-surrender.json";
const eblSurrenderUnwrappedPath = "./tests/e2e/fixtures/unwrapped/ebl-surrender.json";
fs.readFile(eblSurrenderTemplatePath, "utf-8", async (error, data) => {
  await updateDocument(error, data, eblSurrenderUnwrappedPath);
});

// update unwrapped ebl-transfer-holder with new dns that is created by oa-cli dns sandbox
const eblTransferHolderTemplatePath = "./tests/e2e/fixtures/template/ebl-transfer-holder.json";
const eblTransferHolderUnwrappedPath = "./tests/e2e/fixtures/unwrapped/ebl-transfer-holder.json";
fs.readFile(eblTransferHolderTemplatePath, "utf-8", async (error, data) => {
  await updateDocument(error, data, eblTransferHolderUnwrappedPath);
});

const oaCLI_PATH = "open-attestation";

// wrap documents 1 by 1, cannot batch as there is something wrong with the merkleRoot when batch.
shell.exec(`${oaCLI_PATH} wrap ${eblEndorseOwnerUnwrappedPath} --output-dir ./tests/e2e/fixtures/wrapped --oav3`);
shell.exec(`${oaCLI_PATH} wrap ${eblNominateOwnerUnwrappedPath} --output-dir ./tests/e2e/fixtures/wrapped --oav3`);
shell.exec(`${oaCLI_PATH} wrap ${eblSurrenderUnwrappedPath} --output-dir ./tests/e2e/fixtures/wrapped --oav3`);
shell.exec(`${oaCLI_PATH} wrap ${eblTransferHolderUnwrappedPath} --output-dir ./tests/e2e/fixtures/wrapped --oav3`);

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

// Read all the files in fixtures to get the merkleRoot
const readFilesPromise = [
  new Promise((resolve, reject) => {
    fs.readFile("./tests/e2e/fixtures/wrapped/ebl-endorse-owner.json", "utf-8", async (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  }),
  new Promise((resolve, reject) => {
    fs.readFile("./tests/e2e/fixtures/wrapped/ebl-nominate-owner.json", "utf-8", async (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  }),
  new Promise((resolve, reject) => {
    fs.readFile("./tests/e2e/fixtures/wrapped/ebl-surrender.json", "utf-8", async (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  }),
  new Promise((resolve, reject) => {
    fs.readFile("./tests/e2e/fixtures/wrapped/ebl-transfer-holder.json", "utf-8", async (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  }),
];

const getMerkleRoot = (data) => {
  const jsonData = JSON.parse(data);
  return jsonData.proof.merkleRoot;
};

Promise.all(readFilesPromise)
  .then(([eblEndorseOwner, eblNominateOwner, eblSurrender, eblTransferHolder]) => {
    // eblNominateOwner, eblSurrender, eblTransferHolder]) => {
    const eblEndorseOwnerMerkleRoot = getMerkleRoot(eblEndorseOwner);
    const eblNominateOwnerMerkleRoot = getMerkleRoot(eblNominateOwner);
    const eblSurrenderMerkleRoot = getMerkleRoot(eblSurrender);
    const eblTransferHolderMerkleRoot = getMerkleRoot(eblTransferHolder);

    const merkleRootToMint = {
      tokenRegistry: [
        {
          // Endorse Owner
          merkleRoot: `0x${eblEndorseOwnerMerkleRoot}`,
          ...defaultToken,
        },
        {
          // Nominate Owner
          merkleRoot: `0x${eblNominateOwnerMerkleRoot}`,
          ...defaultToken,
        },
        {
          // Surrender
          merkleRoot: `0x${eblSurrenderMerkleRoot}`,
          ...defaultToken,
        },
        {
          // Transfer Holder
          merkleRoot: `0x${eblTransferHolderMerkleRoot}`,
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

    shell.exec(
      `${oaCLI_PATH} title-escrow nominate-change-owner --newBeneficiary ${ADDRESS_EXAMPLE_3} --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId 0x${eblEndorseOwnerMerkleRoot} -n local -k ${ACCOUNT_KEY}`
    );
  })
  .catch((error) => {
    console.error(error);
  });
