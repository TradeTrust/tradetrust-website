import React, { FunctionComponent, useState } from "react";
import { addClassNameIfExist } from "../../../utils";

type headingTag = "h3" | "h5";

interface AccordionItemProps {
  classNameContainer?: string;
  classNameCollapse?: string;
  classNameContent?: string;
  headingTag?: headingTag;
  heading: string;
  children: React.ReactNode;
}

export const AccordionItem: FunctionComponent<AccordionItemProps> = ({
  classNameContainer,
  classNameCollapse,
  classNameContent,
  headingTag = "h5",
  heading,
  children,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`transition-color duration-200${addClassNameIfExist(` ${classNameContainer}`)}`}>
      <div
        className={`flex justify-between items-center transition-colors duration-200 cursor-pointer hover:text-cerulean${
          open ? " text-cerulean" : ""
        }${addClassNameIfExist(` ${classNameCollapse}`)}`}
        onClick={() => setOpen(!open)}
      >
        {headingTag === "h3" && <h3>{heading}</h3>}
        {headingTag === "h5" && <h5>{heading}</h5>}
        <svg
          className={`transition-transform duration-200 transform${open ? " rotate-180" : " rotate-0"}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="stroke-current"
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="stroke-current"
            d="M8 10L12 14L16 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {open && <div className={addClassNameIfExist(classNameContent)}>{children}</div>}
    </div>
  );
};
