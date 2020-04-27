import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { CSSTransition } from "react-transition-group";
import { routes } from "./routes";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { FooterDefault } from "./components/Layout/Footer";
import { Overlay } from "./components/UI/Overlay";
import { useKeyPress } from "./common/hooks/useKeyPress";
import { OverlayProvider } from "./common/contexts/OverlayContext";

const AppContainer = () => {
  const [overlayContent, setOverlayContent] = useState(<></>);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const overlayStore = {
    overlayContent: overlayContent,
    setOverlayContent: setOverlayContent,
    isOverlayVisible: isOverlayVisible,
    setOverlayVisible: setOverlayVisible,
  };
  const escapePress = useKeyPress("Escape");

  useEffect(() => {
    if (escapePress) {
      setOverlayVisible(false);
    }
  }, [escapePress]);

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
        <CSSTransition
          in={isOverlayVisible}
          timeout={400}
          classNames="fade"
          unmountOnExit
          onEnter={() => setOverlayVisible(true)}
          onExited={() => setOverlayVisible(false)}
        >
          <Overlay>{overlayContent}</Overlay>
        </CSSTransition>
      </OverlayProvider>
    </>
  );
};

export default hot(AppContainer);
