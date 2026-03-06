const path = require("path");
const { ethers, Wallet } = require("ethers");
const ERC1967Proxy_artifact = require("../../src/test/fixture/artifacts/ERC1967Proxy.json");

/**
 * IMPORTANT: This script uses only contract artifacts from @trustvc/trustvc
 * and avoids importing helper functions (deployTokenRegistry, mint) to prevent
 * ESM module errors in Node.js/GitHub Actions environments.
 *
 * The helper functions have dependencies that include ESM-only modules
 * (@digitalbazaar/bls12-381-multikey) which cannot be required() in CommonJS.
 *
 * Instead, we use direct ethers.js ContractFactory deployment and contract
 * interaction, which is more reliable in CI/CD environments.
 */
const v5ContractsPath = path.resolve(
  __dirname,
  "../../node_modules/@trustvc/trustvc/dist/cjs/token-registry-v5/contracts.js"
);
const v5Contracts = require(v5ContractsPath);

// Define local chain ID directly for local development
const CHAIN_ID = { local: 1337 };

(async () => {
  const {
    TDocDeployer__factory,
    TitleEscrowFactory__factory,
    TradeTrustToken__factory,
    TradeTrustTokenStandard__factory,
  } = v5Contracts; // Remove ERC1967__factory from here

  // Note: Dummy test wallets — private keys for local development and CI/CD only.
  // These wallets are not for production and hold no funds or value on any network.
  const ACCOUNT_KEY = "0xe82294532bcfcd8e0763ee5cef194f36f00396be59b94fb418f5f8d83140d9a7";
  const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";
  const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
  const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";

  const TITLE_ESCROW_FACTORY_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";

  // Setup provider and signer
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/", Number(CHAIN_ID.local));
  const signer = new Wallet(ACCOUNT_KEY, provider);

  console.log("Deploying Title Escrow Factory...");
  // Deploy Title Escrow Factory
  const titleEscrowFactoryForStandalone = new ethers.ContractFactory(
    TitleEscrowFactory__factory.abi,
    TitleEscrowFactory__factory.bytecode,
    signer
  );
  const titleEscrowFactoryContractForStandalone = await titleEscrowFactoryForStandalone.deploy();
  await titleEscrowFactoryContractForStandalone.deployed();
  console.log(`Title Escrow Factory deployed at: ${titleEscrowFactoryContractForStandalone.address}`);

  console.log("Deploying Token Registry (standalone)...");
  // Deploy Token Registry (standalone mode)
  const tokenRegistryFactory = new ethers.ContractFactory(
    TradeTrustToken__factory.abi,
    TradeTrustToken__factory.bytecode,
    signer
  );
  const tokenRegistryContract = await tokenRegistryFactory.deploy(
    "DEMO TOKEN REGISTRY",
    "DTR",
    titleEscrowFactoryContractForStandalone.address
  );
  await tokenRegistryContract.deployed();
  console.log(`Token Registry deployed at: ${tokenRegistryContract.address}`);

  console.log("Deploying Document Store...");
  // Deploy Document Store (using artifact if available)
  // Note: You may need to import DocumentStore artifact similar to how you're using it in the codebase
  // For now, we'll skip this as it's not critical for the token registry tests
  console.log("Document Store deployment skipped (not critical for token registry tests)");

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

  // Mint tokens using direct contract interaction
  console.log("Minting tokens...");
  const tokenRegistryForMinting = new ethers.Contract(
    TOKEN_REGISTRY_ADDRESS,
    TradeTrustTokenStandard__factory.abi,
    signer
  );

  for (const element of tokensToMint.tokenRegistry) {
    console.log(`Minting token ${element.tokenId}...`);
    try {
      const tx = await tokenRegistryForMinting.mint(element.owner, element.holder, element.tokenId);
      await tx.wait();
      console.log(`Token ${element.tokenId} minted successfully`);
    } catch (error) {
      console.error(`Failed to mint token ${element.tokenId}:`, error.message);
    }
  }

  console.log("\n=== Contract Setup Complete ===");
  console.log(`Title Escrow Factory: ${titleEscrowFactoryContractForStandalone.address}`);
  console.log(`Token Registry: ${tokenRegistryContract.address}`);
  console.log(`TDoc Deployer (Proxy): ${ERC1967ProxyFactoryContract.address}`);
  console.log(`Token Implementation: ${tokenImplementationContract.address}`);
  console.log(`Title Escrow Factory (V5): ${titleEscrowFactoryContract.address}`);
})();
