import React, { ReactElement } from "react";
import { Web3Context, Web3ContextProps } from "../../contexts/Web3Context";

class Web3EnabledWidget extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render(): ReactElement {
    return (
      <Web3Context.Consumer>
        {(web3Context: any) => {
          return <Widget {...web3Context} />;
        }}
      </Web3Context.Consumer>
    );
  }
}

class Widget extends React.Component<Web3ContextProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentBlockNumber: 0,
      privateKey: {
        address: "1fc5c8f02c375edfe17ec005a047b9e945a6e446",
        id: "e235cd57-0e74-4e5c-8bff-00f2de552584",
        version: 3,
        Crypto: {
          cipher: "aes-128-ctr",
          cipherparams: { iv: "947d7e91a2cbc6207f826f020fe4438a" },
          ciphertext: "22152c01515bcee86b8750ab487928c2906d9ba045240165248adaf77bc073b4",
          kdf: "scrypt",
          kdfparams: {
            salt: "b530d2233eca28ba4fa593b027efec563f0f182e60e53caf3cabf53a2871a4a3",
            n: 131072,
            dklen: 32,
            p: 1,
            r: 8
          },
          mac: "6387dd75b6a113908644d01557855389af20f614c581c52bbcdd7c83be3f430b"
        }
      }
    };

    this.handleRefreshBlock.bind(this);
  }

  handleRefreshBlock = async (): Promise<void> => {
    const blockNumber = await this.props.web3.getBlockNumber();
    this.setState({ currentBlockNumber: blockNumber });
  };

  handleCreateWallet = async (): Promise<void> => {
    await this.props.setWallet(this.state.privateKey, "password");
    console.log(await this.props.wallet.getBalance());
  };

  render(): ReactElement {
    return (
      <>
        <p>{this.state.currentBlockNumber}</p>
        <button type="button" className="btn btn-primary" onClick={this.handleRefreshBlock}>
          Test
        </button>
        <button type="button" className="btn btn-primary" onClick={this.handleCreateWallet}>
          Create Wallet
        </button>
      </>
    );
  }
}

export default Web3EnabledWidget;
