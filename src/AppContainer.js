import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import { routes } from "./routes";
import { NavigationBar } from "./components/Layout/NavigationBar";
import { FooterDefault } from "./components/Layout/Footer";
import {
  OverlayYoutube,
  OverlayAddressBook,
  OverlayMessagePromptNoMetamask,
  OverlayMessagePromptNoManageAccess,
} from "./components/UI/Overlay";
import { CSSTransition } from "react-transition-group";
import { useKeyPress } from "./common/hooks/useKeyPress";
import { OverlayId, OverlayProvider } from "./common/context/OverlayContext";
import { useAddressBook } from "./common/hooks/useAddressBook";
import { SvgIcon, SvgIconXCircle } from "./components/UI/SvgIcon";

const AppContainer = () => {
  const [overlayId, setOverlayId] = useState("");
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const overlayStore = {
    overlayId: overlayId,
    setOverlayId: setOverlayId,
    isOverlayVisible: isOverlayVisible,
    setOverlayVisible: setOverlayVisible,
  };
  const escapePress = useKeyPress("Escape");
  const { addressBook } = useAddressBook();

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
          <>
            {overlayId === OverlayId.VideoCrossBorderTrade && (
              <OverlayYoutube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />
            )}
            {overlayId === OverlayId.AddressBook && (
              <OverlayAddressBook title="Address Book" addressBook={addressBook} data-testid="overlay-addressbook" />
            )}
            {overlayId === OverlayId.MessagePromptNoMetamask && (
              <OverlayMessagePromptNoMetamask
                title="Metamask not installed"
                titleIcon={
                  <SvgIcon>
                    <SvgIconXCircle />
                  </SvgIcon>
                }
              />
            )}
            {overlayId === OverlayId.MessagePromptNoManageAccess && (
              <OverlayMessagePromptNoManageAccess
                title="No manage assets access"
                titleIcon={
                  <SvgIcon>
                    <SvgIconXCircle />
                  </SvgIcon>
                }
              />
            )}
          </>
        </CSSTransition>
      </OverlayProvider>
    </>
  );
};

export default hot(AppContainer);
