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
import { Edit3, X, Printer, Book } from "react-feather";

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
      <Edit3 />
    </ButtonIconWhiteOrange>
  );
};

export const IconWhiteOrangeDisabled = () => {
  return (
    <ButtonIconWhiteOrange disabled>
      <Edit3 />
    </ButtonIconWhiteOrange>
  );
};

export const IconWhiteBlue = () => {
  return (
    <ButtonIconWhiteBlue>
      <Printer />
    </ButtonIconWhiteBlue>
  );
};

export const IconOrangeWhite = () => {
  return (
    <ButtonIconOrangeWhite>
      <Book />
    </ButtonIconOrangeWhite>
  );
};

export const CircleGreylight = () => {
  return (
    <ButtonCircleGreylight>
      <X />
    </ButtonCircleGreylight>
  );
};
