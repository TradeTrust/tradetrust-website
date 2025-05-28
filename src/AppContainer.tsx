import { Button, ButtonHeight, ButtonSize } from "./components/Button";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, rightNavItems } from "./components/Layout/NavigationBar";
import PopupMessage from "./components/PopupMessage";
import { Overlay } from "./components/UI/Overlay";
import { URLS } from "./constants";
import { Routes, routes } from "./routes";

const AppContainer = (): React.ReactElement => {
  const location = useLocation();
  const [toggleNavBar, setToggleNavBar] = useState(false);

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
      {location.pathname.includes("/creator") ? (
        <div className="bg-cerulean-800 text-white py-4 px-0" data-testid="old-creator-banner">
          <div className="container">
            <div className="flex flex-wrap">
              <div className="flex flex-col sm:flex-row items-start xs:items-center justify-normal xs:justify-center sm:justify-between w-full gap-2">
                <p className="mb-0">Welcome to our upgraded creator!</p>
                <a className="w-full xs:w-auto" href={URLS.CREATOR} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full xs:w-auto bg-white text-cerulean-500 hover:bg-cloud-100"
                    style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    size={ButtonSize.SM}
                    height={ButtonHeight.SM}
                  >
                    Use Previous Creator
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-cerulean-800 text-white py-2 px-0" data-testid="old-verifier-banner">
          <div className="container">
            <div className="flex flex-wrap">
              <div className="flex flex-col sm:flex-row items-start xs:items-center justify-normal xs:justify-center sm:justify-between w-full gap-2">
                <p className="mb-0">Welcome to our upgraded verifier!</p>
                <a className="w-full xs:w-auto" href={URLS.REF} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full xs:w-auto bg-white text-cerulean-500 hover:bg-cloud-100"
                    style={{ paddingLeft: "4rem", paddingRight: "4rem" }}
                    size={ButtonSize.SM}
                    height={ButtonHeight.SM}
                  >
                    Use Previous Verifier
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
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
