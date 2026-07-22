import { createPublicClient, createWalletClient, custom, http } from "viem";
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { createSmartAccountClient } from "permissionless";
import { to7702SimpleSmartAccount } from "permissionless/accounts";
import { buildSmartAccountClient } from "./buildSmartAccountClient";

jest.mock("viem", () => ({
  ...jest.requireActual("viem"),
  createPublicClient: jest.fn(),
  createWalletClient: jest.fn(),
  custom: jest.fn(),
  http: jest.fn(),
}));
jest.mock("permissionless/clients/pimlico", () => ({ createPimlicoClient: jest.fn() }));
jest.mock("permissionless", () => ({ createSmartAccountClient: jest.fn() }));
jest.mock("permissionless/accounts", () => ({ to7702SimpleSmartAccount: jest.fn() }));

describe("buildSmartAccountClient", () => {
  const userAddress = "0x1111111111111111111111111111111111111111" as `0x${string}`;
  const paymasterAddress = "0x2222222222222222222222222222222222222222" as `0x${string}`;
  const rpcUrl = "https://rpc.example.com";
  const pimlicoApiKey = "test-pimlico-key";

  const mockPublicClient = { public: true };
  const mockWalletClient = { wallet: true };
  const mockSmartAccount = { account: true };
  const mockSmartAccountClient = { sendTransaction: jest.fn() };
  const mockPimlicoClient = { getUserOperationGasPrice: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (createPublicClient as jest.Mock).mockReturnValue(mockPublicClient);
    (createWalletClient as jest.Mock).mockReturnValue(mockWalletClient);
    (custom as jest.Mock).mockReturnValue("custom-transport");
    (http as jest.Mock).mockImplementation((url?: string) => `http-transport:${url ?? ""}`);
    (createPimlicoClient as jest.Mock).mockReturnValue(mockPimlicoClient);
    (to7702SimpleSmartAccount as jest.Mock).mockResolvedValue(mockSmartAccount);
    (createSmartAccountClient as jest.Mock).mockReturnValue(mockSmartAccountClient);
    (window as any).ethereum = { request: jest.fn() };
  });

  it("throws for an unsupported chain id", async () => {
    await expect(buildSmartAccountClient(userAddress, paymasterAddress, 999999, rpcUrl, pimlicoApiKey)).rejects.toThrow(
      "Unsupported chainId for gasless operations: 999999"
    );
  });

  it("builds clients for a supported chain (Sepolia) and returns them", async () => {
    const result = await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    expect(result.smartAccountClient).toBe(mockSmartAccountClient);
    expect(result.publicClient).toBe(mockPublicClient);
  });

  it("builds clients for a supported chain (Polygon Amoy)", async () => {
    const result = await buildSmartAccountClient(userAddress, paymasterAddress, 80002, rpcUrl, pimlicoApiKey);

    expect(result.smartAccountClient).toBe(mockSmartAccountClient);
  });

  it("points the pimlico bundler transport at the given API key and chain id", async () => {
    await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    expect(http).toHaveBeenCalledWith(`https://api.pimlico.io/v2/11155111/rpc?apikey=${pimlicoApiKey}`);
  });

  it("creates the wallet client using window.ethereum as the transport source", async () => {
    await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    expect(custom).toHaveBeenCalledWith((window as any).ethereum);
    expect(createWalletClient).toHaveBeenCalledWith(
      expect.objectContaining({ account: userAddress, transport: "custom-transport" })
    );
  });

  it("creates the 7702 smart account with the public client and wallet client as owner", async () => {
    await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    expect(to7702SimpleSmartAccount).toHaveBeenCalledWith(
      expect.objectContaining({ client: mockPublicClient, owner: mockWalletClient })
    );
  });

  it("wires the smart account client with a paymaster middleware returning the given paymaster address", async () => {
    await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    const call = (createSmartAccountClient as jest.Mock).mock.calls[0][0];
    expect(call.account).toBe(mockSmartAccount);

    const stubData = await call.paymaster.getPaymasterStubData();
    expect(stubData.paymaster).toBe(paymasterAddress);

    const paymasterData = await call.paymaster.getPaymasterData();
    expect(paymasterData.paymaster).toBe(paymasterAddress);
  });

  it("estimates fees per gas using the pimlico client's fast tier", async () => {
    mockPimlicoClient.getUserOperationGasPrice.mockResolvedValue({
      fast: { maxFeePerGas: 100n, maxPriorityFeePerGas: 10n },
    });

    await buildSmartAccountClient(userAddress, paymasterAddress, 11155111, rpcUrl, pimlicoApiKey);

    const call = (createSmartAccountClient as jest.Mock).mock.calls[0][0];
    const fees = await call.userOperation.estimateFeesPerGas();

    expect(fees).toEqual({ maxFeePerGas: 100n, maxPriorityFeePerGas: 10n });
  });
});
