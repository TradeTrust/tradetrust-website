const shell = require('shelljs');
const path = require('path');
const { ethers, Wallet } = require("ethers");
const ERC1967Proxy_artifact = require("../../src/test/fixture/artifacts/ERC1967Proxy.json"); // Assuming this is the correct deployable proxy artifact

// Import only the specific modules we need to avoid problematic ESM dependencies
const v5ContractsPath = path.resolve(
  __dirname,
  "../../node_modules/@trustvc/trustvc/dist/cjs/token-registry-v5/contracts.js"
);
const v5Contracts = require(v5ContractsPath);

// Define local chain ID directly for local development
const CHAIN_ID = { local: 1337 };

(async () => {
  const { TDocDeployer__factory, TitleEscrowFactory__factory, TradeTrustTokenStandard__factory } = v5Contracts; // Remove ERC1967__factory from here

  const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
  const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";
  const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
  const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";

  const oaCLI_PATH = "tradetrust";

  const TITLE_ESCROW_FACTORY_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";

  shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n local -k ${ACCOUNT_KEY}`);

  shell.exec(
    `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n local -k ${ACCOUNT_KEY} --factory-address ${TITLE_ESCROW_FACTORY_ADDRESS} --standalone`
  );

  // Additional step to sync testcafe and synpress addresses
  shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);

  // Setup TDoc Deployer
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/", Number(CHAIN_ID.local));
  const signer = new Wallet(ACCOUNT_KEY, provider);

  const tDocDeployerFactory = new ethers.ContractFactory(
    TDocDeployer__factory.abi,
    TDocDeployer__factory.bytecode,
    signer
  );
  const ERC1967ProxyFactory = new ethers.ContractFactory(
    ERC1967Proxy_artifact.abi,
    ERC1967Proxy_artifact.bytecode || ERC1967Proxy_artifact.data.bytecode.object,
    signer
  ); // Standard Typechain output has .bytecode, older truffle/hardhat might have .data.bytecode.object
  const titleEscrowFactory = new ethers.ContractFactory(
    TitleEscrowFactory__factory.abi,
    TitleEscrowFactory__factory.bytecode,
    signer
  );
  const tokenImplementation = new ethers.ContractFactory(
    TradeTrustTokenStandard__factory.abi,
    TradeTrustTokenStandard__factory.bytecode,
    signer
  );
  const tDocDeployerFactoryContract = await tDocDeployerFactory.deploy();
  const ERC1967ProxyFactoryContract = await ERC1967ProxyFactory.deploy(
    tDocDeployerFactoryContract.address,
    "0x8129fc1c"
  );
  const titleEscrowFactoryContract = await titleEscrowFactory.deploy();
  const tokenImplementationContract = await tokenImplementation.deploy();

  // addresses are same when executed for the first time after blockchain node is started.
  const TOKEN_IMPLEMENTATION_ADDRESS = "0x0952a6817E00fc2455418a5303395760A9c4EE71"; //tokenImplementationContract.address
  const TITLE_ESCROW_FACTORY_ADDRESS2 = "0x547Ca63C8fB3Ccb856DEb7040D327dBfe4e7d20F"; //titleEscrowFactoryContract.address;
  const TDOC_DEPLOYER_ADDRESS = "0xfE442b75786c67E1e7a7146DAeD8943F0f2c23d2"; //tDocDeployerFactoryContract.address
  const ERC1967_PROXY_ADDRESS2 = "0x3488EAA1bF4f606f758b24F5ef6eb2a1E32335be"; //ERC1967ProxyFactoryContract.address

  const tDocDeployerThroughProxy = new ethers.Contract(
    ERC1967ProxyFactoryContract.address,
    TDocDeployer__factory.abi,
    signer
  );
  const addImplementationTx = await tDocDeployerThroughProxy.addImplementation(
    TOKEN_IMPLEMENTATION_ADDRESS,
    titleEscrowFactoryContract.address
  );

  const addImplementationReceipt = await addImplementationTx.wait();

  // --- End TDoc Deployer Setup
  
  const defaultToken = {
    accountKey: ACCOUNT_KEY,
    tokenRegistryAddress: TOKEN_REGISTRY_ADDRESS,
    owner: ADDRESS_EXAMPLE_1,
    holder: ADDRESS_EXAMPLE_1,
  };
    
  const tokensToMint = {
    tokenRegistry: [
      {
        // Endorse Owner
        tokenId: "0x1a32e030f8ebef2a6a00c3513086b27b1233095df6cae6a47e6a36ecc09b7cf9",
        ...defaultToken,
      },
      {
        // Nominate Owner
        ...defaultToken,
        tokenId: "0x06d7151cfd58bff997b599a742e77e0bbef694d8e502824b5157517698c02577",
        holder: ADDRESS_EXAMPLE_2,
      },
      {
        // Surrender
        tokenId: "0x300e1a6fcecfd40fad5f0e3167bd3be6c6fcd3e7ec3f48b157e29b4ab1d32755",
        ...defaultToken,
      },
      {
        // Transfer Holder
        tokenId: "0xf22f8487eced43cf4b0afb2043f83877690f05ed8ecea5177305b945525b4e60",
        ...defaultToken,
      },
    ],
  };

  tokensToMint.tokenRegistry.forEach((element) => {
    shell.exec(
      `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.tokenId} -n local -k ${element.accountKey}`
    );
  });
})()
