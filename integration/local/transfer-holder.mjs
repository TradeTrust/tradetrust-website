import expect from "expect-puppeteer";

export const transferHolder = async (metamask, browser) => {
  // force process to exit if any assertion fail
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    const inputUploadHandle = await page.$("input[type=file]");
    inputUploadHandle.uploadFile("./integration/local/ebl-transfer-holder.json");

    await page.waitForSelector("[data-testid='connectToWallet']", { visible: true });
    await page.click("[data-testid='connectToWallet']");

    // START - approve application once, subsequent tests no longer need
    await metamask.approve({ allAccounts: true });
    await page.bringToFront();
    // END - approve application once, subsequent tests no longer need

    await page.waitFor(1500); // after connect, need to wait awhile
    await page.waitForSelector("[data-testid='manageAssetDropdown']", { visible: true });
    await page.click("[data-testid='manageAssetDropdown']");

    await page.waitForSelector("[data-testid='transferHolderDropdown']", { visible: true });
    await page.click("[data-testid='transferHolderDropdown']");

    await page.waitForSelector("[data-testid='editable-input-holder']", { visible: true });
    await page.focus("[data-testid='editable-input-holder']");
    await page.keyboard.type("0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60");

    await page.waitForSelector("[data-testid='transferBtn']", { visible: true });
    await page.click("[data-testid='transferBtn']");

    await page.waitFor(1500); // switch between metamask / page tab, need to wait awhile
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(1500); // switch between metamask / page tab, need to wait awhile

    await expect(page).toMatchElement("[data-testid='non-editable-input-holder']", {
      text: "0xcDFAcbb428DD30ddf6d99875dcad04CbEFcd6E60",
      visible: true,
    });

    await expect(page).toMatchElement(".overlay h3", {
      text: "Transfer Holder Success",
      visible: true,
    });

    await page.close();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
