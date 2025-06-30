import React, { FunctionComponent, useState } from "react";
import { NavigationBar } from "./NavigationBar";
import { MockLogo, MockLeftNavItems, MockRightNavItems, MockMobileNavItems } from "./NavigationBar.mock";

export default {
  title: "Navigation/NavigationBar",
  component: NavigationBar,
  parameters: {
    componentSubtitle: "Navigation bar for Tradetrust website",
  },
};

export const Default: FunctionComponent = () => {
  const [toggleNavBar, setToggleNavBar] = useState(false);
  return (
    <div className="bg-black py-4">
      <div className="border border-solid border-cloud-300">
        <NavigationBar
          logo={<MockLogo />}
          menuLeft={MockLeftNavItems}
          menuRight={MockRightNavItems}
          menuMobile={MockMobileNavItems}
          setToggleNavBar={setToggleNavBar}
          toggleNavBar={toggleNavBar}
        />
      </div>
    </div>
  );
};
