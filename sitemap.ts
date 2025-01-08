import path from "path";
import fs from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { paths } from "./src/config/routes-config";

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

const allPages = [...mainPages, ...cmsDetailPages];

const sitemap = new SitemapStream({ hostname: "https://www.tradetrust.io" });
const sitemapPath = path.join(__dirname, "public", "static");
fs.mkdirSync(sitemapPath, { recursive: true });
const writeStream = fs.createWriteStream(path.join(sitemapPath, "sitemap.xml"));

sitemap.pipe(writeStream);
allPages.forEach((page) => {
  sitemap.write(page);
});
sitemap.end();
