import puppeteer from "puppeteer";
import dappeteer from "dappeteer";

export const metamaskInit = async () => {
  try {
    const browser = await dappeteer.launch(puppeteer, {
      args: ["--no-sandbox"],
      executablePath: process.env.PUPPETEER_EXEC_PATH,
      headless: false, // must be false, so can test with metamask extension
      defaultViewport: null,
      slowMo: 10, // to see what's gg on
    });
    const metamask = await dappeteer.getMetamask(browser, {
      seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
    });

    await metamask.switchNetwork("localhost");
    await metamask.importPK("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
    await metamask.switchAccount(1);

    console.log("✅ Metamask account init success");
    return { metamask, browser };
  } catch (e) {
    console.log("❌ Metamask account init fail");
    console.log(e);
    process.exit(1);
  }
};
