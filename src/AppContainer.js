import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { hot } from "react-hot-loader/root";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { NETWORK } from "./config";
import { Routes, routes } from "./routes";

const AppContainer = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network={NETWORK}>
        You are currently on <span className="capitalize">{NETWORK}</span> network.
      </NetworkBar>
      <NavigationBar />
      <main className="flex-1">
          <Routes routes={routes} />
      </main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default hot(AppContainer);
