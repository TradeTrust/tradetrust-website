import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import initStore from "./../../../store";
import { ManageAssetsDropdown } from "./ManageAssetsDropdown";
import { act } from "react-dom/test-utils";

const history = createBrowserHistory();
const store = initStore(history);

describe("ManageAssets", () => {
  it("should show Manage Assets text", () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress=""
            approvedHolderAddress=""
            beneficiaryAddress=""
            holderAddress=""
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );
    expect(container.queryByText("Manage Assets")).not.toBeNull();
  });

  it("userWalletAddress === beneficiaryAddress, should show only Endorse change of beneficiary item", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress=""
            approvedHolderAddress=""
            beneficiaryAddress="0xA"
            holderAddress=""
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).not.toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Surrender document")).toBeNull();
  });

  it("userWalletAddress === BeneficiaryAddress + approvedBeneficiaryAddress && approvedHolderAddress exists, should not show any items", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress="0xB"
            approvedHolderAddress="0xC"
            beneficiaryAddress="0xA"
            holderAddress=""
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Surrender document")).toBeNull();
  });

  it("userWalletAddress === HolderAddress, should show only Transfer holder item", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress=""
            approvedHolderAddress=""
            beneficiaryAddress=""
            holderAddress="0xA"
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).not.toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Surrender document")).toBeNull();
  });

  it("userWalletAddress === holderAddress + approvedBeneficiaryAddress && approvedHolderAddress exists, should show Transfer holder, Confirm endorse change of beneficiary items", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress="0xB"
            approvedHolderAddress="0xC"
            beneficiaryAddress=""
            holderAddress="0xA"
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).not.toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).not.toBeNull();
    expect(container.queryByText("Surrender document")).toBeNull();
  });

  it("userWalletAddress === BeneficiaryAddress and HolderAddress, should show Transfer holder, Endorse change of beneficiary and Surrender document items", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress=""
            approvedHolderAddress=""
            beneficiaryAddress="0xA"
            holderAddress="0xA"
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).not.toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).not.toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Surrender document")).not.toBeNull();
  });

  it("userWalletAddress === BeneficiaryAddress and HolderAddress + approvedBeneficiaryAddress && approvedHolderAddress exists, should show Transfer holder, Confirm change of beneficiary and Surrender document items", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress="0xB"
            approvedHolderAddress="0xC"
            beneficiaryAddress="0xA"
            holderAddress="0xA"
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).not.toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).not.toBeNull();
    expect(container.queryByText("Surrender document")).not.toBeNull();
  });

  it("userWalletAddress no match, should not show any items", async () => {
    const container = render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ManageAssetsDropdown
            userWalletAddress="0xA"
            approvedBeneficiaryAddress=""
            approvedHolderAddress=""
            beneficiaryAddress=""
            holderAddress=""
            metamaskAccountError=""
          />
        </ConnectedRouter>
      </Provider>
    );

    await act(async () => {
      fireEvent.click(container.queryByText("Manage Assets") as HTMLButtonElement);
    });

    expect(container.queryByText("Transfer holdership")).toBeNull();
    expect(container.queryByText("Endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Confirm endorse change of beneficiary")).toBeNull();
    expect(container.queryByText("Surrender document")).toBeNull();
  });
});
