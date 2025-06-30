import React, { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import * as NavType from "./../type";
import { ButtonSize, LinkButton } from "../../Button";

export const NavigationBarItem: FunctionComponent<{
  item: NavType.NavigationItem;
}> = ({ item }) => {
  switch (item.schema) {
    case NavType.NAVIGATION_ITEM_TYPE.NavigationIconButton:
      return <IconButton item={item} />;
    case NavType.NAVIGATION_ITEM_TYPE.NavigationLabelButton:
      return <LabelButton item={item} />;
    case NavType.NAVIGATION_ITEM_TYPE.NavigationDropDownList:
      return <DropDownList item={item} />;
    default:
      return <NavigationLink item={item} />;
  }
};

const NavigationLink: FunctionComponent<{ item: NavType.NavigationLink }> = ({ item }) => {
  return (
    <>
      {item.customLink ? (
        item.customLink
      ) : (
        <a className="text-cloud-500" href={item.path}>
          {item.label}
        </a>
      )}
    </>
  );
};

const LabelButton: FunctionComponent<{
  item: NavType.NavigationLabelButton;
}> = ({ item }) => {
  return (
    <>
      {item.customLink ? (
        item.customLink
      ) : (
        <LinkButton
          href={item.path}
          className="text-white bg-cloud-800 hover:text-white hover:bg-cerulean-500"
          data-testid={item.id}
          size={ButtonSize.SM}
        >
          {item.label}
        </LinkButton>
      )}
    </>
  );
};

const IconButton: FunctionComponent<{ item: NavType.NavigationIconButton }> = ({ item }) => {
  const ButtonIcon = item.icon;

  return (
    <>
      {item.customLink ? (
        item.customLink
      ) : (
        <a className="text-cloud-500" href={item.path} data-testid={item.id}>
          <ButtonIcon className="stroke-current" />
        </a>
      )}
    </>
  );
};

const DropDownList: FunctionComponent<{
  item: NavType.NavigationDropDownList;
}> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener(
        "click",
        () => {
          setIsOpen(false);
        },
        { once: true }
      );
    }

    return () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div
        className="cursor-pointer text-cloud-500 hover:text-cerulean-800 flex items-center focus:outline-none outline-none"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <span className="py-2 transition-colors duration-200 ease-out">{item.label}</span>
        <svg
          className={`-mr-1 ml-1 h-5 w-5 transition-transform duration-200 ease-out transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className={`w-max min-w-full z-30 lg:left-0 lg:absolute lg:-bottom-0 lg:transform lg:translate-y-full text-sm font-gilroy-bold`}
        >
          <div className={`bg-white rounded-md lg:shadow-dropdown`}>
            {item.dropdownItems?.map((dropdownItem: NavType.NavigationDropDownItems, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {dropdownItem.customLink ? (
                    <div className="relative">{dropdownItem.customLink}</div>
                  ) : (
                    <a key={index} className="block px-4 py-3 text-cloud-500" href={dropdownItem.path}>
                      {dropdownItem.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
