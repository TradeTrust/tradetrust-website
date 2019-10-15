import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import Footer from "../src/components/Layout/Footer";
import Collaborate from "../src/components/Collaborate/Collaborate";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Collaborate",
  description:
    "If you are from an institution and would like to get started on OpenCerts, here are some companies that can help to issue your certificates.",
  openGraph: {
    title: "OpenCerts - Collaborate",
    description:
      "If you are from an institution and would like to get started on OpenCerts, here are some companies that can help to issue your certificates.",
    url: `${URL}/collaborate`
  }
};

const CollaboratePage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="collaborate" />
    <Collaborate />
    <Footer />
  </>
);

export default connect()(CollaboratePage);
