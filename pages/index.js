import React from "react";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import Footer from "../src/components/Layout/Footer";
import MainPageContainer from "../src/components/MainPageContainer";
import { DEFAULT_SEO } from "../src/config";

const VerifierPage = () => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    <NavigationBar active="home" />
    <MainPageContainer />
    <Footer />
  </>
);

export default connect()(VerifierPage);
