import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, rightNavItems } from "./components/Layout/NavigationBar";
import PopupMessage from "./components/PopupMessage";
import { Overlay } from "./components/UI/Overlay";
import { Routes, routes } from "./routes";
import CookieNotice from "./components/CookieNotice";

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);

  // Clear session storage on initial load
  useEffect(() => {
    sessionStorage.removeItem("account");
    sessionStorage.removeItem("chainId");
  }, []);

  useEffect(() => {
    setToggleNavBar(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex flex-col min-h-full" data-location={location.pathname}>
      <NavigationBar
        toggleNavBar={toggleNavBar}
        setToggleNavBar={setToggleNavBar}
        leftItems={[]}
        rightItems={rightNavItems}
      />
      <PopupMessage />
      <main
        className="bg-cerulean-50 bg-cover"
        style={{ backgroundImage: "url('/static/images/common/wave-lines.png')" }}
      >
        <Routes routes={routes} />
      </main>
      <CookieNotice />
      <Footer />
      <Overlay />
    </div>
  );
};

export default AppContainer;
