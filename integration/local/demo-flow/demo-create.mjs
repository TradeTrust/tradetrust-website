import expect from "expect-puppeteer";

export const demoCreate = async (metamask, browser) => {
  // force process to exit if any assertion fail
  try {
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/demo");

    await metamask.approve({ allAccounts: true });
    await page.bringToFront();

    await page.waitForSelector("[data-testid='demoStartNow']", { visible: true });
    await page.click("[data-testid='demoStartNow']");

    await page.waitForSelector("[data-testid='demoFormNext']", { visible: true });
    await page.click("[data-testid='demoFormNext']");

    await page.waitForSelector("[data-testid='demoReviewNext']", { visible: true });
    await page.click("[data-testid='demoReviewNext']");

    await page.waitFor(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(1500);
    await metamask.confirmTransaction();
    await page.bringToFront();
    await page.waitFor(1500);

    await page.close();

    console.log("✅ Demo create success");
  } catch (e) {
    console.log("❌ Demo create fail");
    console.log(e);
    process.exit(1);
  }
};
