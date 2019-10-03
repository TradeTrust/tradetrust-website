import React from "react";
import NavigationBar from "../components/Layout/NavigationBar";
import Footer from "../components/Layout/Footer";
import MainPageContainer from "../components/MainPageContainer";

export const HomePage = () => (
  <>
    <NavigationBar active="home" />
    <MainPageContainer />
    <Footer />
  </>
);
