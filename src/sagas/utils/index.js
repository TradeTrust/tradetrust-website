import { getSelectedWeb3 } from "../application";

export function* isSmartContract(storeAddress) {
  const web3 = yield getSelectedWeb3();
  const onChainByteCode = yield web3.eth.getCode(storeAddress);

  return onChainByteCode !== "0x";
}

export function* areSmartContracts(storeAddresses) {
  const isSmartContractArray = yield storeAddresses.map(isSmartContract);
  return isSmartContractArray.reduce((prev, curr) => prev && curr, true);
}

export const getContractAddress = issuer =>
  issuer.documentStore || issuer.tokenRegistry;
