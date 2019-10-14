import React from "react";
import { NavigationBar } from "../components/Layout/NavigationBar";
import { FooterBar } from "../components/Layout/FooterBar";
import MainPageContainer from "../components/MainPageContainer";

export const HomePage = () => (
  <>
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </>
);
