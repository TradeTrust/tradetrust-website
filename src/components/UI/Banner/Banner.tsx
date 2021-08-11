import React, { FunctionComponent, InputHTMLAttributes } from "react";
import { Button } from "@govtechsg/tradetrust-ui-components";
import { NavLink } from "react-router-dom";

interface BannerProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  children: React.ReactNode;
}

export const Banner: FunctionComponent<BannerProps> = ({ className, children }: BannerProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div className="container">
        <div
          className="rounded-xl bg-cerulean-300 bg-cover"
          style={{ backgroundImage: "url('/static/images/common/wave-lines-light.png')" }}
        >
          <div className="flex flex-wrap items-center p-4 text-white">
            <div className="px-2 w-full lg:w-1/2 xl:w-1/3 mb-2 lg:mb-0">
              <p className="text-2xl">{children}</p>
            </div>
            <div className="px-2 w-auto lg:ml-auto">
              <NavLink to="/contact">
                <Button className="bg-tangerine text-white hover:bg-tangerine-600">Contact us now</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
