import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, leftNavItems, rightNavItems } from "./components/Layout/NavigationBar";
import { Routes, routes } from "./routes";
import { useProviderContext } from "./common/contexts/provider";
import { getChainInfo } from "./common/utils/chain-utils";

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const { currentChainId } = useProviderContext();

  useEffect(() => {
    setToggleNavBar(false);
    window.scrollTo(0, 0);
  }, [location]);

  const networkName = currentChainId ? getChainInfo(currentChainId).label : "Unsupported";

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network={networkName}>
        You are currently on <span className="capitalize">{networkName}</span> network.
      </NetworkBar>
      <NavigationBar
        toggleNavBar={toggleNavBar}
        setToggleNavBar={setToggleNavBar}
        leftItems={leftNavItems}
        rightItems={rightNavItems}
      />
      <main
        className="bg-cerulean-50 flex-1 bg-cover"
        style={{ backgroundImage: "url('/static/images/common/wave-lines.png')" }}
      >
        <Routes routes={routes} />
      </main>
      <Footer />
      <Overlay />
    </div>
  );
};

export default AppContainer;
