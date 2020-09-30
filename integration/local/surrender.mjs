import expect from "expect-puppeteer";

export const surrender = async (metamask, browser) => {
  // force process to exit if any assertion fail
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    const inputUploadHandle = await page.$("input[type=file]");
    inputUploadHandle.uploadFile("./integration/local/ebl-surrender.json");

    await page.waitForSelector("[data-testid='connectToWallet']");
    await page.click("[data-testid='connectToWallet']");

    await page.waitForSelector("[data-testid='manageAssetDropdown']");
    await page.click("[data-testid='manageAssetDropdown']");

    await page.waitForSelector("[data-testid='surrenderDropdown']");
    await page.click("[data-testid='surrenderDropdown']");

    await page.waitForSelector("[data-testid='surrenderBtn']");
    await page.click("[data-testid='surrenderBtn']");

    await metamask.confirmTransaction();

    await page.bringToFront();
    await page.waitFor(1000);

    await expect(page).toMatchElement("#surrender-sign", {
      text: "Surrendered To Issuer",
      visible: true,
    });
    await page.close();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};
