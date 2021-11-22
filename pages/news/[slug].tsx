import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { getHeadersFromContext } from "../../src/utils/index";
import { NextPageProps } from "../../src/types";

import { useRouter } from "next/router";
import { NewsSingle, NewsTag } from "../../src/components/News/types";
import { ResourceDownload } from "../../src/components/UI/ResourceDownload";
import { NewsDetailContent } from "../../src/components/News/NewsDetailContent/NewsDetailContent";

import { allNews } from "../../src/components/News";
import { ChevronLeft } from "react-feather";

const NewsDetailPage: NextPage<NextPageProps> = ({ headers }) => {
  const router = useRouter();

  const { slug } = router.query;

  const detail: NewsSingle = allNews.find((news) => news.slug === slug);
  const newsletters: NewsSingle[] = allNews.filter((news) => news.type === NewsTag.NEWSLETTER);

  return (
    <>
      <Head>
        <meta
          property="description"
          content="Check out our events and browse through our latest news and official statements."
        />
        <meta
          property="og:description"
          content="Check out our events and browse through our latest news and official statements."
        />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${headers.host}${router.pathname}`} />
        <title>TradeTrust - {detail.attributes.title}</title>
      </Head>
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

NewsDetailPage.getInitialProps = async (ctx) => {
  return {
    headers: getHeadersFromContext(ctx),
  };
};

export default NewsDetailPage;
