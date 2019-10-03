import React from "react";
import NavigationBar from "../components/Layout/NavigationBar";
import FaqContent from "../components/FAQ/FaqContent";
import Footer from "../components/Layout/Footer";

export const FaqPage = () => (
  <>
    <NavigationBar active="faq" />
    <FaqContent />
    <Footer />
  </>
);
