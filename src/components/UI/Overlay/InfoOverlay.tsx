import { Overlay, OverlayContext } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { FunctionComponent, useContext } from "react";

export interface InfoOverlayProps {
  className?: string;
  children: React.ReactNode;
}

export const InfoOverlay: FunctionComponent<InfoOverlayProps> = ({ className, children }) => {
  const { showOverlay } = useContext(OverlayContext);

  return (
    <>
      <Overlay />
      <div className={className} onClick={() => showOverlay(children)}>
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
          <title>Network Selector Info</title>
          <path
            d="M7.8999 12.3C7.8999 11.6 7.9999 11.2 8.1999 10.9C8.3999 10.6 8.7999 10.2 9.2999 9.8C9.5999 9.5 9.8999 9.2 10.0999 8.9C10.2999 8.6 10.3999 8.2 10.3999 7.9C10.3999 7.5 10.2999 7.1 10.0999 6.9C9.8999 6.7 9.5999 6.5 9.0999 6.5C8.7999 6.5 8.4999 6.6 8.1999 6.8C7.9999 7 7.8999 7.3 7.8999 7.7H5.8999C5.8999 6.8 6.1999 6.1 6.7999 5.7C7.3999 5.2 8.1999 5 9.1999 5C10.1999 5 11.0999 5.3 11.5999 5.8C12.1999 6.3 12.4999 7 12.4999 7.9C12.4999 8.5 12.2999 9 11.9999 9.5C11.6999 10 11.1999 10.4 10.6999 10.8C10.3999 11 10.1999 11.2 10.0999 11.5C9.9999 11.6 9.9999 11.9 9.9999 12.3H7.8999Z"
            fill="#4BC3E9"
          />
          <path
            d="M8.9002 15.3004C9.56294 15.3004 10.1002 14.7631 10.1002 14.1004C10.1002 13.4376 9.56294 12.9004 8.9002 12.9004C8.23745 12.9004 7.7002 13.4376 7.7002 14.1004C7.7002 14.7631 8.23745 15.3004 8.9002 15.3004Z"
            fill="#4BC3E9"
          />
          <path
            d="M9 3C12.9 3 16 6.1 16 10C16 13.9 12.9 17 9 17C5.1 17 2 13.9 2 10C2 6.1 5.1 3 9 3ZM9 1C4 1 0 5 0 10C0 15 4 19 9 19C14 19 18 15 18 10C18 5 14 1 9 1Z"
            fill="#4BC3E9"
          />
        </svg>
      </div>
    </>
  );
};
