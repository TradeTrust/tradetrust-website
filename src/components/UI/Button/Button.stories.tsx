import React from "react";
import {
  Button,
  ButtonSolid,
  ButtonSolidOrangeWhite,
  ButtonBorderedBlue,
  ButtonSolidWhiteOrange,
  ButtonSolidWhiteBlue,
  ButtonSolidRedWhite,
  ButtonSolidWhiteGrey,
  ButtonSolidGreenWhite,
  ButtonIconWhiteOrange,
  ButtonIconWhiteBlue,
  ButtonIconOrangeWhite,
  ButtonCircleGreylight,
} from "./Button";
import { SvgIcon, SvgIconEdit, SvgIconX, SvgIconPrinter, SvgIconBook } from "../SvgIcon";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    componentSubtitle: "ButtonSolid, ButtonBordered, ButtonIcon, ButtonCircle.",
  },
};

export const Solid = () => {
  return <ButtonSolid>Solid</ButtonSolid>;
};

export const SolidDisabled = () => {
  return <ButtonSolid disabled>SolidDisabled</ButtonSolid>;
};

export const SolidOrangeWhite = () => {
  return <ButtonSolidOrangeWhite>SolidOrangeWhite</ButtonSolidOrangeWhite>;
};

export const SolidWhiteOrange = () => {
  return <ButtonSolidWhiteOrange>WhiteOrange</ButtonSolidWhiteOrange>;
};

export const SolidWhiteBlue = () => {
  return <ButtonSolidWhiteBlue>WhiteBlue</ButtonSolidWhiteBlue>;
};

export const SolidRedWhite = () => {
  return <ButtonSolidRedWhite>RedWhite</ButtonSolidRedWhite>;
};

export const SolidWhiteGrey = () => {
  return <ButtonSolidWhiteGrey>WhiteGrey</ButtonSolidWhiteGrey>;
};

export const SolidGreenWhite = () => {
  return <ButtonSolidGreenWhite>GreenWhite</ButtonSolidGreenWhite>;
};

export const BorderedBlue = () => {
  return <ButtonBorderedBlue>BorderedBlue</ButtonBorderedBlue>;
};

export const IconWhiteOrange = () => {
  return (
    <ButtonIconWhiteOrange>
      <SvgIcon>
        <SvgIconEdit />
      </SvgIcon>
    </ButtonIconWhiteOrange>
  );
};

export const IconWhiteOrangeDisabled = () => {
  return (
    <ButtonIconWhiteOrange disabled>
      <SvgIcon>
        <SvgIconEdit />
      </SvgIcon>
    </ButtonIconWhiteOrange>
  );
};

export const IconWhiteBlue = () => {
  return (
    <ButtonIconWhiteBlue>
      <SvgIcon>
        <SvgIconPrinter />
      </SvgIcon>
    </ButtonIconWhiteBlue>
  );
};

export const IconOrangeWhite = () => {
  return (
    <ButtonIconOrangeWhite>
      <SvgIcon>
        <SvgIconBook />
      </SvgIcon>
    </ButtonIconOrangeWhite>
  );
};

export const CircleGreylight = () => {
  return (
    <ButtonCircleGreylight>
      <SvgIcon>
        <SvgIconX />
      </SvgIcon>
    </ButtonCircleGreylight>
  );
};
