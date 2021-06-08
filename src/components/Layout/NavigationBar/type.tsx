import { Icon } from "react-feather";

export interface NavigationBarProps {
  navigationItems: NavigationItem[];
}

export enum NavigationItemType {
  NavigationLink = "NavigationLink",
  DropDownList = "DropDownList",
  LabelButton = "LabelButton",
  IconButton = "IconButton",
}

export interface NavigationLink {
  schema: NavigationItemType.NavigationLink;
  id: string;
  label: string;
  className?: string;
  path: string;
}

export interface DropDownList extends Omit<NavigationLink, "schema"> {
  schema: NavigationItemType.DropDownList;
  dropdownItems: { id: string; label: string; path: string }[];
}

export interface LabelButton extends Omit<NavigationLink, "schema"> {
  schema: NavigationItemType.LabelButton;
  onClick?: () => void;
}

export interface IconButton extends Omit<NavigationLink, "schema"> {
  schema: NavigationItemType.IconButton;
  icon: Icon;
}

export type NavigationItem = NavigationLink | DropDownList | LabelButton | IconButton;
