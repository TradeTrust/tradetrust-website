import puppeteer from "puppeteer";
import dappeteer from "dappeteer";
import { transferHolder } from "./transfer-holder.mjs";
import { endorseOwner } from "./endorse-owner.mjs";
import { nominateOwner } from "./nominate-owner.mjs";
import { nominateOwnerAccept } from "./nominate-owner-accept.mjs";
import { surrender } from "./surrender.mjs";
import { surrenderReject } from "./surrender-reject.mjs";
import { surrenderAccept } from "./surrender-accept.mjs";

const main = async () => {
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
  } catch (e) {
    console.log("❌ Metamask account init fail");
    console.log(e);
    process.exit(1);
  }

  await transferHolder(metamask, browser);
  await endorseOwner(metamask, browser);
  await nominateOwner(metamask, browser);
  await nominateOwnerAccept(metamask, browser);
  await surrender(metamask, browser);
  await surrenderReject(metamask, browser);
  await surrender(metamask, browser); // surrender again to test accept surrender flow
  await surrenderAccept(metamask, browser);

  // assuming all previous try catch passed, close and exit
  await browser.close();
  process.exit(0);
};

main();
