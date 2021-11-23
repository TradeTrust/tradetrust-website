import React from "react";
import { NextPage } from "next";
import Link from "next/link";

import { useRouter } from "next/router";
import { NewsSingle, NewsTag } from "../../src/components/News/types";
import { ResourceDownload } from "../../src/components/UI/ResourceDownload";
import { NewsDetailContent } from "../../src/components/News/NewsDetailContent/NewsDetailContent";

import { allNews } from "../../src/components/News";
import { ChevronLeft } from "react-feather";
import { NextSeo } from "next-seo";
import { getSeo } from "../../src/common/utils/seo";

const NewsDetailPage: NextPage = () => {
  const router = useRouter();

  const { slug } = router.query;

  const detail: NewsSingle = allNews.find((news) => news.slug === slug);
  const newsletters: NewsSingle[] = allNews.filter((news) => news.type === NewsTag.NEWSLETTER);

  return (
    <>
      <NextSeo
        {...getSeo({
          title: detail.attributes.title,
          path: router.pathname,
          description: "Check out our events and browse through our latest news and official statements.",
        })}
      />
      <div className="container py-12">
        <div className="flex">
          <div className="w-auto">
            <Link href="/news">
              <a className="text-gray-800 flex flex-nowrap items-center">
                <ChevronLeft />
                <span>Back</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap py-4 mb-8 -mx-4">
          <div className="w-full lg:w-2/3 lg:px-4">
            <NewsDetailContent detail={detail} />
          </div>
          <div className="w-full lg:w-1/3 lg:px-4 hidden lg:block">
            <ResourceDownload title="Newsletter" resources={newsletters} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetailPage;
