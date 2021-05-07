import puppeteer from "puppeteer";
import dappeteer from "dappeteer";
import { transferHolder } from "./transfer-holder.mjs";
import { surrender } from "./surrender.mjs";

const main = async () => {
  const browser = await dappeteer.launch(puppeteer, {
    headless: false, // https://github.com/puppeteer/puppeteer#default-runtime-settings
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    slowMo: 20, // to see what's gg on
  });
  const metamask = await dappeteer.getMetamask(browser, {
    seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
  });

  await metamask.switchNetwork("localhost");

  await transferHolder(metamask, browser);
  await surrender(metamask, browser);

  await browser.close();
  process.exit(0);
};

main();
