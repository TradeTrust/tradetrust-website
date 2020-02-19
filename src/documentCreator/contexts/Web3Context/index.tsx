import React, { ReactElement } from "react";
import { ethers, providers } from "ethers";
import { getWeb3FromEnvironment } from "./utils";
import { getLogger } from "../../logger";
import { EncryptedJsonWallet } from "../../types";

const { trace } = getLogger("Web3Context");

export interface Web3ContextProps {
  web3: ethers.providers.BaseProvider;
  wallet: ethers.Wallet;
  setWeb3: (web3: ethers.providers.Web3Provider) => void;
  setWallet: (walletEncryptedJson: EncryptedJsonWallet, password: string) => Promise<void>;
}

/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore: this context is not supposed to be used separately from the provider component below so the defaultValue will never be used
export const Web3Context = React.createContext<Web3ContextProps>();

export class Web3Provider extends React.Component<any, Web3ContextProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      web3: new ethers.providers.InfuraProvider(),
      wallet: ethers.Wallet.createRandom(),
      setWeb3: (web3: providers.BaseProvider) => {
        this.setState(prevState => {
          return { ...prevState, web3 };
        });
      },
      setWallet: async (walletEncryptedJson: EncryptedJsonWallet, password: string) => {
        const decryptedWallet = await ethers.Wallet.fromEncryptedJson(JSON.stringify(walletEncryptedJson), password);
        const connectedWallet = await decryptedWallet.connect(this.state.web3);
        this.setState(prevState => {
          return { ...prevState, wallet: connectedWallet };
        });
      }
    };
  }

  componentDidMount(): void {
    const windowWeb3 = getWeb3FromEnvironment();

    if (windowWeb3) {
      trace(`Got web3 on context mount:`, windowWeb3);
      this.setWeb3(windowWeb3);
    }
  }

  setWeb3(web3Provider: providers.BaseProvider): void {
    this.setState({ web3: web3Provider });
  }

  render(): ReactElement {
    return <Web3Context.Provider value={this.state}>{this.props.children}</Web3Context.Provider>;
  }
}
