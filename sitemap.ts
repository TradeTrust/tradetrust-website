const path = require("path");
const fs = require("fs");
const { SitemapStream, streamToPromise } = require("sitemap");
const { paths } = require("./src/config/routes-config");

// https://github.com/ekalinin/sitemap.js/blob/master/api.md#sitemap-item-options
interface SitemapRecord {
  url: string;
  changefreq?: string;
  priority?: number;
}

const mainPages: SitemapRecord[] = [];
const pathArray: string[] = Object.values(paths);
Object.values(pathArray).reduce((accumulator, currentPath) => {
  if (!currentPath.includes("*") && !currentPath.includes(":slug")) {
    accumulator.push({
      url: currentPath,
      changefreq: "monthly",
      priority: 0.6,
    });
  }
  return accumulator;
}, mainPages);

const cmsDetailPages: SitemapRecord[] = [];
const populateCmsPages = (prefix: string, srcDirectory: string) => {
  fs.readdirSync(srcDirectory).forEach((file: string) => {
    const name = path.parse(file).name;
    if (name !== ".DS_Store") {
      cmsDetailPages.push({
        url: `${prefix}${name}`,
        changefreq: "monthly",
        priority: 0.5,
      });
    }
  });
};
populateCmsPages("/news/", `${__dirname}/cms/article`);
populateCmsPages("/news/", `${__dirname}/cms/newsletter`);
populateCmsPages("/news/", `${__dirname}/cms/partner-news`);
populateCmsPages("/news/", `${__dirname}/cms/press-release`);
populateCmsPages("/news/", `${__dirname}/cms/speech`);
populateCmsPages("/event/", `${__dirname}/cms/event`);

const allPages = [...mainPages, ...cmsDetailPages];

const sitemap = new SitemapStream({ hostname: "https://www.tradetrust.io" });
const writeStream = fs.createWriteStream(`public/static/sitemap.xml`);

sitemap.pipe(writeStream);
allPages.forEach((page) => {
  sitemap.write(page);
});
sitemap.end();
