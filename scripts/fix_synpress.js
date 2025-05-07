const fs = require("fs");

const synpressConfigPath = "./node_modules/@synthetixio/synpress/commands/playwright.js";

let playwright = fs.readFileSync(synpressConfigPath, { encoding: "utf8" });
playwright = playwright.replace(").split(': ')[1];", ").split(': ')[1].replace(/(\\n| )/g, '');");
playwright = playwright.replace(").toLowerCase();", ").toLowerCase().replace(/(\\n| )/g, '');");

fs.writeFileSync(synpressConfigPath, playwright, { encoding: "utf8" });

const synpressMetamaskPath = "./node_modules/@synthetixio/synpress/commands/metamask.js";

let metamask = fs.readFileSync(synpressMetamaskPath, { encoding: "utf8" });
metamask = metamask.replace(
  `  async acceptAccess(options) {
    const notificationPage = await playwright.switchToMetamaskNotification();
    if (options && options.allAccounts) {
      await playwright.waitAndClick(
        notificationPageElements.selectAllCheckbox,
        notificationPage,
      );
    }
    await playwright.waitAndClick(
      notificationPageElements.nextButton,
      notificationPage,
      { waitForEvent: 'navi' },
    );

    if (options && options.signInSignature) {`,
  `  async acceptAccess(options) {
    const notificationPage = await playwright.switchToMetamaskNotification();
    if (options && options.allAccounts) {
      await playwright.waitAndClick(
        notificationPageElements.selectAllCheckbox,
        notificationPage,
      );
    }

    await playwright.waitAndClick(
      notificationPageElements.nextButton,
      notificationPage,
      { waitForEvent: 'navi' },
    );

    if (options && options.allAccounts) {
      await playwright.waitAndClick(
        notificationPageElements.nextButton,
        notificationPage,
        { waitForEvent: 'navi' },
      );
    }

    if (options && options.signInSignature) {`
);

fs.writeFileSync(synpressMetamaskPath, metamask, { encoding: "utf8" });
