import React from "react";
import { mount } from "enzyme";
import { TokenSideBarContainer } from "./TokenSideBarContainer";
import { provider, contract, accounts } from "@openzeppelin/test-environment";
import { ethers, providers } from "ethers";
import { useInjectedProvider } from "../../common/hooks/useInjectedProvider";
import SampleToken from "../../test/fixture/sample-token.json";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { TokenInstanceProviderWithSigner } from "../../common/contexts/tokenInstancesContextWithSigner";

import { TitleEscrowABI, TitleEscrowByteCode, TokenRegistryByteCode, TokenRegistryABI } from "@govtechsg/oa-token";

const TradeTrustERC721 = contract.fromABI(TokenRegistryABI, TokenRegistryByteCode);
const TitleEscrow = contract.fromABI(TitleEscrowABI, TitleEscrowByteCode);
import { useTitleEscrowContract } from "../../common/hooks/useTitleEscrowContract";
import { useTokenRegistryContract } from "../../common/hooks/useTokenRegistryContract";

jest.mock("../../common/hooks/useInjectedProvider");
jest.mock("../../common/hooks/useTitleEscrowContract");
jest.mock("../../common/hooks/useTokenRegistryContract");

describe("tokenSideBarContainer", () => {
  let ERC721Instance;
  let TitleEscrowInstance;
  let registryAddress;
  let web3Provider: providers.Web3Provider;
  const [sender, receiver] = accounts;

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    ERC721Instance = await TradeTrustERC721.new("foo", "bar");
    registryAddress = ERC721Instance.address;
    TitleEscrowInstance = await TitleEscrow.new(registryAddress, sender, receiver);
    web3Provider = new ethers.providers.Web3Provider(provider as any);
    (useTitleEscrowContract as jest.Mock).mockReturnValue({ titleEscrow: TitleEscrowInstance });
    (useTokenRegistryContract as jest.Mock).mockReturnValue({ tokenRegistry: ERC721Instance });
    (useInjectedProvider as jest.Mock).mockReturnValue({ web3Provider, signer: web3Provider.getSigner() });
  });

  it("should have a Manage Asset heading", () => {
    const wrapper = mount(
      <TokenInstanceProviderWithSigner document={SampleToken as WrappedDocument}>
        <TokenSideBarContainer
          isSidebarVisible={true}
          toggleSidebar={jest.fn()}
          document={SampleToken as WrappedDocument}
        />
      </TokenInstanceProviderWithSigner>
    );
    expect(wrapper.find("TokenSideBarContent")).toHaveLength(1);
  });
});
