import React, { FunctionComponent } from "react";
import { NavigationBarItem } from "./NavigationBarItem";
import { NavigationItem } from "./type";

export interface NavigationBarProps {
  logo: React.ReactElement;
  menuLeft: NavigationItem[];
  menuRight?: NavigationItem[];
  menuMobile: NavigationItem[];
  setToggleNavBar: (toggleNavBar: boolean) => void;
  toggleNavBar: boolean;
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const collapsed = !props.toggleNavBar;

  return (
    <nav className="border-b border-[#E2E3E7] bg-white">
      <div className="text-cloud-500 font-medium">
        <div className="container">
          <div className="relative flex h-[68px] items-center justify-between gap-7">
            <div className="flex w-[140px] shrink-0 items-center">{props.logo}</div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-7">
                {props.menuLeft.map((item, index) => {
                  return (
                    <div key={index}>
                      <NavigationBarItem item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="ml-auto hidden self-center sm:block">
              {props.menuRight && (
                <div className="flex items-center gap-4">
                  {props.menuRight.map((item, index) => {
                    return (
                      <div key={index}>
                        <NavigationBarItem item={item} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={!collapsed}
              className="flex h-11 w-11 items-center justify-center border-0 bg-transparent sm:hidden"
              onClick={() => {
                props.setToggleNavBar(!props.toggleNavBar);
              }}
            >
              <span className="relative block h-6 w-6">
                <span
                  style={{
                    height: 2,
                    transform: collapsed ? "translateY(-6px)" : "translateY(0) rotate(45deg)",
                  }}
                  className="absolute top-1/2 block w-full bg-[#424448] transition-transform duration-200 ease-out"
                />
                <span
                  style={{ height: 2, opacity: collapsed ? 1 : 0 }}
                  className="absolute top-1/2 block w-full -translate-y-1/2 bg-[#424448] transition-opacity duration-200"
                />
                <span
                  style={{
                    height: 2,
                    transform: collapsed ? "translateY(6px)" : "translateY(0) rotate(-45deg)",
                  }}
                  className="absolute top-1/2 block w-full bg-[#424448] transition-transform duration-200 ease-out"
                />
              </span>
            </button>
          </div>
        </div>
        <div className="sm:hidden">
          <div
            className={`container rounded-md bg-white overflow-auto transition-height ease-in-out duration-700 ${
              props.toggleNavBar ? "max-h-screen" : "max-h-0"
            }`}
          >
            {props.menuMobile.map((item, index) => {
              if (item.id === "create-documents" || item.id === "verify" || item.id === "settings") {
                return (
                  <div key={index} className="my-4 md:hidden">
                    <NavigationBarItem item={item} />
                  </div>
                );
              }
              return (
                <div key={index} className="my-4">
                  <NavigationBarItem item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
