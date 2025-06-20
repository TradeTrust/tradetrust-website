const shell = require('shelljs');
const { v5Contracts, CHAIN_ID } = require("@trustvc/trustvc");
const { ethers, Wallet } = require("ethers");
const ERC1967Proxy_artifact = require("../../src/test/fixture/artifacts/ERC1967Proxy.json"); // Assuming this is the correct deployable proxy artifact


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

  merkleRootToMint.tokenRegistry.forEach((element) => {
    shell.exec(
      `${oaCLI_PATH} token-registry issue --beneficiary ${element.owner} --holder ${element.holder} --address ${element.tokenRegistryAddress} --tokenId ${element.merkleRoot} -n local -k ${element.accountKey}`
    );
  });
})()
