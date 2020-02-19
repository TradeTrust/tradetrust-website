import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Web3Provider, Web3Context } from ".";
import { EncryptedJsonWallet } from "../../types";

describe("test", () => {
  it("wallet is correctly imported", async () => {
    const exampleWallet = {
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
    };
    const tree = (
      <Web3Provider>
        <Web3Context.Consumer>
          {({
            setWallet,
            wallet
          }: {
            setWallet: (w: EncryptedJsonWallet, pwd: string) => void;
            wallet: EncryptedJsonWallet;
          }) => (
            <>
              <button
                onClick={() => {
                  setWallet(exampleWallet, "password");
                }}
              >
                Load Wallet
              </button>
              <span>Received: {JSON.stringify(wallet)}</span>
            </>
          )}
        </Web3Context.Consumer>
      </Web3Provider>
    );

    const { getByText } = render(tree);
    const buttonThatLoadsWallet = getByText(/Load Wallet/);
    fireEvent.click(buttonThatLoadsWallet);
    await waitForElement(() => {
      const walletText = getByText(/Received:/).textContent?.length ?? 0;
      return walletText > "Received: ".length;
    });
    expect(getByText(/Received:/).textContent).toContain("privateKey");
  });
});
