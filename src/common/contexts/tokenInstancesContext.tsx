import React, { ReactElement } from 'react';
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/types/TradeTrustERC721";
import { WrappedDocument } from "@govtechsg/open-attestation";
import {useTitleEscrowContract} from "../hooks/useTitleEscrowContract";
import {useTokenRegistryContract} from "../hooks/useTokenRegistryContract"
import {useUserWallet} from "../hooks/useUserWallet";
import {getDocumentId, getTokenRegistryAddress} from "../utils/document";
import {useDefaultProvider} from "../hooks/useDefaultProvider";
import {useTitleEscrowUsers} from "../hooks/useTitleEscrowUsers";
import getUserRoles, {UserRole} from "../../utils/UserRolesUtil"
import { useInjectedProvider } from '../hooks/useInjectedProvider';

interface TokenInstanceContextType {
  titleEscrowInstance: TitleEscrow | undefined;
  tokenRegistryInstance: TradeTrustERC721 | undefined;
}

export const TokenInstanceContext = React.createContext<TokenInstanceContextType>({titleEscrowInstance: undefined, tokenRegistryInstance: undefined});

export default ({ document, children }: {document: WrappedDocument, children : ReactElement}) => {
  const {userWalletAddress} = useUserWallet();
  const tokenId = getDocumentId(document);
  const tokenRegistryAddress = getTokenRegistryAddress(document);

  const { provider } = useDefaultProvider(); // Component only need read only access
  let tokenRegistryInstance = useTokenRegistryContract(tokenRegistryAddress, provider).tokenRegistry;
  let titleEscrowInstance = useTitleEscrowContract(tokenRegistryAddress, tokenId, provider).titleEscrow;
  

    const {beneficiary, holder} = useTitleEscrowUsers({titleEscrow: titleEscrowInstance})
    const userRole = getUserRoles({ adminAddress: userWalletAddress, beneficiaryAddress: beneficiary || "", holderAddress: holder || ""});
    if(userRole !== UserRole.NoMatch) { 
      const {provider: injectedProvider} =  useInjectedProvider();
      tokenRegistryInstance = useTokenRegistryContract(tokenRegistryAddress, injectedProvider).tokenRegistry;
      titleEscrowInstance = useTitleEscrowContract(tokenRegistryAddress, tokenId, injectedProvider).titleEscrow;
    }

  return (
    <TokenInstanceContext.Provider value={{ tokenRegistryInstance, titleEscrowInstance }}>
      {children}
    </TokenInstanceContext.Provider>
  );
};