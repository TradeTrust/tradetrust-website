import React from "react";
import NavigationBar from "../components/Layout/NavigationBar";
import { FaqContent } from "../components/FAQ/FaqContent";
import FooterBar from "../components/Layout/FooterBar";

export const FaqPage = () => (
  <>
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </>
);
