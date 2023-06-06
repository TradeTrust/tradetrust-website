// @flow strict

import { Generator } from "./sitemap-generator"
import { Routes, routeMapper, routes } from '../src/routes'
import { events } from "../src/pages/event";
import { allNews } from "../src/components/News";

console.log(routes)

export const getAllEventPaths = (baseURL: string): Array<URL> => {
    // events.forEach((event: any) => {
    //     console.log(event);
    // })
    const mapped: Array<URL> = events.map((value: any, index: number, array: any[]) => {
        return new URL(value.slug, baseURL)//`${baseURL}${value.path}`
    })
    return mapped;
}

export const getAllNews = (baseURL: string): Array<URL> => {
    allNews.forEach((news: any) => {
        console.log(news);
    })
    return allNews;
}

const generator = new Generator(
  'https://tradetrust.io',
//   Routes(routes),
    routes.map(routeMapper),
  {
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'monthly',
    priority: 0.8,
  }
);

generator.generatePaths();
generator.addPaths(getAllEventPaths(generator._baseUrl));
generator.addPaths(getAllNews(generator._baseUrl));

generator.save('public/static/sitemap.xml');