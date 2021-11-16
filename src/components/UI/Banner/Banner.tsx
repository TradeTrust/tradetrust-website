import React, { FunctionComponent, InputHTMLAttributes } from "react";
import { Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import { NavLink } from "../NavLink";

interface BannerProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  title: string;
}

export const Banner: FunctionComponent<BannerProps> = ({ className, title }: BannerProps) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div className="container">
        <div
          className="rounded-xl bg-cerulean bg-cover"
          style={{ backgroundImage: "url('/static/images/common/wave-lines-light.png')" }}
        >
          <div className="flex flex-wrap items-center px-4 py-6 text-white">
            <div className="px-2 w-full lg:w-1/2 mb-2 lg:mb-0">
              <h3 data-testid="banner-title">{title}</h3>
            </div>
            <div className="px-2 w-auto lg:ml-auto">
              <Button className="bg-tangerine hover:bg-tangerine-600 border-none" size={ButtonSize.LG}>
                <NavLink href="/contact">
                  <a className="text-white">
                    <h3>Contact us now</h3>
                  </a>
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
