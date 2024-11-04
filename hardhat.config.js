/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      // mining: {
      //   auto: false,
      //   interval: 3000,
      // },
      accounts: {
        mnemonic: "indicate swing place chair flight used hammer soon photo region volume shuffle",
      },
      throwOnTransactionFailures: false,
    },
  },
  solidity: "0.8.17",
};
