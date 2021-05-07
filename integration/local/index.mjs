import puppeteer from "puppeteer";
import dappeteer from "dappeteer";
import { transferHolder } from "./transfer-holder.mjs";
import { endorseOwner } from "./endorse-owner.mjs";
import { nominateOwner } from "./nominate-owner.mjs";
import { nominateOwnerAccept } from "./nominate-owner-accept.mjs";
import { surrender } from "./surrender.mjs";

// (0) 0xe0A71284EF59483795053266CB796B65E48B5124 (100 ETH)
// (1) 0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60 (100 ETH)
// (2) 0x391aFf3942857a10958425FebF1fC1938D9F5AE7 (100 ETH)
// (3) 0xf47092dce66EAB9e7Fcf52D057CD78656954DccD (100 ETH)
// (4) 0xB6c6cEC4921961B21F5289E12cE6Fd3731205300 (100 ETH)
// (5) 0x4191F68C46C47DdaA88CC2939d792DA0d5B36c28 (100 ETH)
// (6) 0xc9f4dC3310881fD44CA03b04F9A750b21fFc112c (100 ETH)
// (7) 0x9a05687c196Bd07356077A20a91e061D2a6C6Bfe (100 ETH)
// (8) 0x0F210cED247A9478c65a5A701cee753576d23671 (100 ETH)
// (9) 0xd94410B2188cCE9B4Cc489C02177b7F1c420180D (100 ETH)

const main = async () => {
  const browser = await dappeteer.launch(puppeteer, {
    headless: false, // https://github.com/puppeteer/puppeteer#default-runtime-settings
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    slowMo: 10, // to see what's gg on
  });
  const metamask = await dappeteer.getMetamask(browser, {
    seed: "indicate swing place chair flight used hammer soon photo region volume shuffle",
  });

  await metamask.switchNetwork("localhost");
  await metamask.importPK("0xc58c1ff75001afdca8cecb61b47f36964febe4188b8f7b26252286ecae5a8879");
  await metamask.switchAccount(1);

  await transferHolder(metamask, browser);
  await endorseOwner(metamask, browser);
  await nominateOwner(metamask, browser);
  await nominateOwnerAccept(metamask, browser);
  await surrender(metamask, browser);

  await browser.close();
  process.exit(0);
};

main();
