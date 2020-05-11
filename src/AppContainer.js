import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { routes } from "./routes";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { FooterDefault } from "./components/Layout/Footer";
import { Overlay } from "./components/UI/Overlay";
import { OverlayProvider } from "./common/contexts/OverlayContext";

const AppContainer = () => {
  const [overlayContent, setOverlayContent] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const overlayStore = {
    overlayContent,
    setOverlayContent,
    isOverlayVisible,
    setOverlayVisible,
  };

  return (
    <>
      <OverlayProvider value={overlayStore}>
        <NavigationBar />
        <main>
          <Switch>
            {routes.map((route, id) => (
              <Route key={id} {...route} />
            ))}
          </Switch>
        </main>
        <FooterDefault />
        <Overlay>{overlayContent}</Overlay>
      </OverlayProvider>
    </>
  );
};

export default hot(AppContainer);
