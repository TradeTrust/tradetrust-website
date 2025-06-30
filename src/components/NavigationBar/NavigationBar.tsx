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
    <nav className="bg-white">
      <div className="text-cloud-500 font-medium">
        <div className="container py-2">
          <div className="relative flex items-baseline justify-between">
            <div className="self-center md:hidden">
              <button
                className={`flex items-center relative w-6 h-6 ${props.toggleNavBar ? "" : "collapsed"}`}
                onClick={() => {
                  props.setToggleNavBar(!props.toggleNavBar);
                }}
              >
                <span
                  style={{
                    height: 2,
                    transform: collapsed ? "translateY(-4px) rotate(0)" : "translateY(0) rotate(45deg)",
                  }}
                  className="w-full bg-cloud-500 transition-transform duration-200 ease-out absolute block top-bar"
                />
                <span
                  style={{
                    height: 2,
                    transform: collapsed ? "translateY(4px) rotate(0)" : "translateY(0) rotate(-45deg)",
                  }}
                  className="w-full bg-cloud-500 transition-transform duration-200 ease-out absolute block bottom-bar"
                />
              </button>
            </div>
            <div className="absolute md:relative flex items-center w-[104px] md:w-[140px] md:w-auto text-center left-0 right-0 mx-auto md:mx-0 max-w-[168px]">
              {props.logo}
            </div>
            <div className="hidden md:block">
              <div className="flex items-center">
                {props.menuLeft.map((item, index) => {
                  return (
                    <div key={index} className="md:ml-6">
                      <NavigationBarItem item={item} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:block md:ml-auto self-center">
              {props.menuRight && (
                <div className="flex items-center">
                  {props.menuRight.map((item, index) => {
                    return (
                      <div key={index} className="md:ml-2 md:ml-4">
                        <NavigationBarItem item={item} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden">
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
