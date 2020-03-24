module.exports = {
    setupProvider: (baseProvider) => {
      const { GSNDevProvider } = require('@openzeppelin/gsn-provider');
      const { accounts } = require('@openzeppelin/test-environment');
  
      return new GSNDevProvider(baseProvider, {
        txfee: 70,
        useGSN: false,
        ownerAddress: accounts[8],
        relayerAddress: accounts[9],
      });
    },
  };