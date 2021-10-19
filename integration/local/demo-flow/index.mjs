import { metamaskInit } from "../metamask-init.mjs";
import { demoCreate } from "./demo-create.mjs";

export const demoFlow = async (metamask, browser) => {
  const { metamask, browser } = await metamaskInit();
  await demoCreate(metamask, browser);

  // assuming all previous try catch passed, close and exit
  await browser.close();
  process.exit(0);
};

demoFlow();
