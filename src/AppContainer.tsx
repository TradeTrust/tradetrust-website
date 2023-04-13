import { NetworkBar, Overlay } from "@govtechsg/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, leftNavItems, rightNavItems } from "./components/Layout/NavigationBar";
import { IS_DEVELOPMENT } from "./config";
import { Routes, routes } from "./routes";

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);
  const V2_URL: string = IS_DEVELOPMENT ? "https://dev.v2.tradetrust.io/" : "https://v2.tradetrust.io";

  useEffect(() => {
    setToggleNavBar(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NetworkBar network="true">
        Token Registry V2 is no longer supported, visit{" "}
        <a className="hover:text-cerulean-50" href={V2_URL}>
          {V2_URL}
        </a>{" "}
        to verify V2 transferable documents
      </NetworkBar>
      <NavigationBar
        toggleNavBar={toggleNavBar}
        setToggleNavBar={setToggleNavBar}
        leftItems={leftNavItems}
        rightItems={rightNavItems}
      />
      <main
        className="bg-cerulean-50 bg-cover"
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
