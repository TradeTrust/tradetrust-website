import React from "react";
import { Icon } from "react-feather";

export enum NAVIGATION_ITEM_TYPE {
  NavigationLink = "NavigationLink",
  NavigationDropDownList = "NavigationDropDownList",
  NavigationLabelButton = "NavigationLabelButton",
  NavigationIconButton = "NavigationIconButton",
}

export interface NavigationLink {
  schema: NAVIGATION_ITEM_TYPE.NavigationLink;
  id: string;
  label: string;
  className?: string;
  path: string;
  customLink?: React.ReactElement;
}

export interface NavigationDropDownItems {
  id: string;
  label: string;
  path: string;
  customLink?: React.ReactElement;
}

export interface NavigationDropDownList extends Omit<NavigationLink, "schema"> {
  schema: NAVIGATION_ITEM_TYPE.NavigationDropDownList;
  dropdownItems: NavigationDropDownItems[];
}

export interface NavigationLabelButton extends Omit<NavigationLink, "schema"> {
  schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton;
  onClick?: () => void;
}

export interface NavigationIconButton extends Omit<NavigationLink, "schema"> {
  schema: NAVIGATION_ITEM_TYPE.NavigationIconButton;
  icon: Icon;
}

export type NavigationItem = NavigationLink | NavigationDropDownList | NavigationLabelButton | NavigationIconButton;
