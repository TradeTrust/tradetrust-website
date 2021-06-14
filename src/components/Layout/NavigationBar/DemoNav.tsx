import { useOverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../../common/contexts/AuthContext";
import DemoModalContent from "../../Demo/DemoModalContent";
import { NavItemsProps } from "./";
import { IS_MAINNET, DOMAINS } from "../../../config";

interface DemoNavProps extends NavItemsProps {
  className: string;
}

const goToDemo = (history: ReturnType<typeof useHistory>) => history.push("/demo");

export default function DemoNav(props: DemoNavProps) {
  const { label, className } = props;
  const { isLoggedIn } = useAuthContext();
  const { showOverlay } = useOverlayContext();
  const history = useHistory();
  const onOverlayHandler = () => {
    // handle rinkleby as well
    if (IS_MAINNET) {
      return window.location.replace(DOMAINS.ropsten);
    }
    return isLoggedIn ? goToDemo(history) : showOverlay(<DemoModalContent />);
  };
  return (
    <div className={className} onClick={onOverlayHandler}>
      {label}
    </div>
  );
}
