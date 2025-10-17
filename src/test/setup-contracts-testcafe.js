const shell = require("shelljs");
const path = require("path");
const { ethers, Wallet } = require("ethers");
const ERC1967Proxy_artifact = require("./fixture/artifacts/ERC1967Proxy.json"); // Assuming this is the correct deployable proxy artifact

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
  const ACCOUNT_KEY_2 = "0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879";
  const ADDRESS_EXAMPLE_1 = "0xe0a71284ef59483795053266cb796b65e48b5124";
  const ADDRESS_EXAMPLE_2 = "0xcdfacbb428dd30ddf6d99875dcad04cbefcd6e60";

  const oaCLI_PATH = "tradetrust";
  shell.exec(`${oaCLI_PATH} deploy title-escrow-factory -n local -k ${ACCOUNT_KEY}`);
  const TITLE_ESCROW_FACTORY_ADDRESS = "0x63A223E025256790E88778a01f480eBA77731D04";

  shell.exec(
    `${oaCLI_PATH} deploy token-registry "DEMO TOKEN REGISTRY" DTR -n local -k ${ACCOUNT_KEY} --factory-address ${TITLE_ESCROW_FACTORY_ADDRESS} --standalone`
  );
  const TOKEN_REGISTRY_ADDRESS = "0x9Eb613a88534E2939518f4ffBFE65F5969b491FF";

  shell.exec(`${oaCLI_PATH} deploy document-store "My Document Store" -n local -k ${ACCOUNT_KEY}`);
  const DOCUMENT_STORE_ADDRESS = "0x4Bf7E4777a8D1b6EdD5F2d9b8582e2817F0B0953";

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

  const MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT =
    "0xbc08b23e18ae6028be5cd51f1fd7add305bb05448594326240817b7011e243da";

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
      ...[
        "0x8f39d973ec500c1c0a510c3153707ee68d0889be9bdde3a8e3dfa40db266989c",
        "0x28c99df4a369856891f0ac3f7f3e093b3713bd5d9950c4580777d761590c52d4",
        "598122e29c62235138e9f318cd26a287eacb0af86b1ed8ca65cc3ecfed40520a",
        "0x0102d39f774d3214cec087063cc9d3705db972926e892238a4a232d709274a39",
        "0x76f608c209f8e449d1ea57999bef458fff928d7967e13d71a0f2348b3d5be4b1",
        "0xe52a60e9c1308960bcf1d6c8531c58bf480aec373e1e3442a6af151475c3f89d",
        "0x1683a00c42430b72c42a8013e6695b839ab7f7b06db69835b974392613826bd2",
        "0xa0bf0f3823a8857d068740c6f936eeab2de0516161924f84fe4c1ef6061732d2", // ebl-withoutnetwork.json
      ].map((hash) => ({
        merkleRoot: hash,
        ...defaultToken,
      })),
    ],
  };

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
    `${oaCLI_PATH} title-escrow return-to-issuer --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
  );
  shell.exec(
    `${oaCLI_PATH} title-escrow accept-returned --token-registry ${TOKEN_REGISTRY_ADDRESS} --tokenId ${MERKLE_ROOT_OF_ENDORSEMENT_CHAIN_DOCUMENT} -n local -k ${ACCOUNT_KEY}`
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
    "0x4a3fecc833135c185618af09f80ba78a5a3547357253488f72c80da6174961bf",
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

  // Generate self sign ssl for testcafe to verify w3c document.
  // Need to run testcafe with ssl. https://stackoverflow.com/questions/74067564/how-to-get-subtlecrypto-work-with-testcafe
  shell.exec(
    `openssl req -nodes -new -x509 -keyout src/test/ca/myCA.key -out src/test/ca/myCA.pem -subj "/C=SG/ST=SG/L=/O=/OU=/CN=www.example.com/emailAddress=dev@www.example.com"`
  );
  shell.exec(`openssl genrsa -out src/test/ca/testingdomain.key 2048`);
  shell.exec(
    `openssl req -new -key src/test/ca/testingdomain.key -out src/test/ca/testingdomain.csr -subj "/C=SG/ST=SG/L=/O=/OU=/CN=www.example.com/emailAddress=dev@www.example.com"`
  );
  shell.exec(
    `openssl x509 -req -in src/test/ca/testingdomain.csr -CA src/test/ca/myCA.pem -CAkey src/test/ca/myCA.key -CAcreateserial -out src/test/ca/testingdomain.crt -sha256 -extfile src/test/ca/testdomain.ext`
  );
  shell.exec(
    `openssl pkcs12 -passout pass: -export -out src/test/ca/testingdomain.pfx -inkey src/test/ca/testingdomain.key -in src/test/ca/testingdomain.crt -certfile src/test/ca/myCA.pem`
  );
})();
