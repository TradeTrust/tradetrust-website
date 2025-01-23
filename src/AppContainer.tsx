import { Button, ButtonSize, Overlay } from "@tradetrust-tt/tradetrust-ui-components";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "./components/Layout/Footer";
import { NavigationBar, rightNavItems } from "./components/Layout/NavigationBar";
import { Routes, routes } from "./routes";
import PopupMessage from "./components/PopupMessage";
import { URLS } from "./constants";

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
      <div className="bg-cerulean-800 text-white py-2 px-0" data-testid="new-verifier-banner">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="col-auto flex items-center justify-between w-full">
              <p className="mb-0 w-full sm:w-2/3">
                To serve our community better, we are upgrading to a newer version that has new capabilities to your
                transferable documents.
              </p>
              <div className="w-full sm:w-1/3 flex gap-2">
                <a href={URLS.DOCS} target="_blank" rel="noopener noreferrer" className="flex-1 flex">
                  <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800 w-full" size={ButtonSize.SM}>
                    Learn More
                  </Button>
                </a>
                <a href={URLS.REF_V5TR} target="_blank" rel="noopener noreferrer" className="flex-1 flexß">
                  <Button className="bg-white text-cerulean-500 hover:bg-cloud-100 w-full" size={ButtonSize.SM}>
                    Try New Verifier
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
