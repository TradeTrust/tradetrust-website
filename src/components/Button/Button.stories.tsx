import React from "react";

import { Button, ButtonIcon, ButtonSize } from "./Button";
import { Edit3, X, Printer, Book } from "react-feather";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    componentSubtitle: "Button, ButtonIcon.",
  },
};

export const LG = (): React.ReactNode => {
  return <Button size={ButtonSize.LG}>Large</Button>;
};

export const MD = (): React.ReactNode => {
  return <Button size={ButtonSize.MD}>Medium</Button>;
};

export const SM = (): React.ReactNode => {
  return <Button size={ButtonSize.SM}>Small</Button>;
};

export const SolidDefault = (): React.ReactNode => {
  return <Button>SolidDefault</Button>;
};

export const SolidDisabled = (): React.ReactNode => {
  return <Button disabled>SolidDisabled</Button>;
};

export const SolidOrangeWhite = (): React.ReactNode => {
  return <Button className="bg-tangerine-500 text-white hover:bg-tangerine-800">SolidOrangeWhite</Button>;
};

export const SolidWhiteOrange = (): React.ReactNode => {
  return <Button className="bg-white text-tangerine-500 hover:bg-gray-50">SolidWhiteOrange</Button>;
};

export const SolidWhiteBlue = (): React.ReactNode => {
  return <Button className="bg-white text-cerulean-500 hover:bg-gray-50">SolidWhiteBlue</Button>;
};

export const SolidRedWhite = (): React.ReactNode => {
  return <Button className="bg-scarlet-400 text-white hover:bg-red-400">SolidRedWhite</Button>;
};

export const SolidWhiteGrey = (): React.ReactNode => {
  return <Button className="bg-white text-gray-500 hover:bg-gray-50">SolidWhiteGrey</Button>;
};

export const SolidGreenWhite = (): React.ReactNode => {
  return <Button className="bg-forest-500 text-white hover:bg-forest-700">SolidGreenWhite</Button>;
};

export const BorderedBlue = (): React.ReactNode => {
  return <Button className="bg-white text-cerulean-500 border-cerulean-500 hover:bg-gray-50">BorderedBlue</Button>;
};

export const IconWhiteOrange = (): React.ReactNode => {
  return (
    <ButtonIcon className="bg-white hover:bg-gray-50">
      <Edit3 className="text-tangerine" />
    </ButtonIcon>
  );
};

export const IconWhiteOrangeDisabled = (): React.ReactNode => {
  return (
    <ButtonIcon className="bg-white hover:bg-gray-50" disabled>
      <Edit3 className="text-tangerine" />
    </ButtonIcon>
  );
};

export const IconWhiteBlue = (): React.ReactNode => {
  return (
    <ButtonIcon className="bg-white hover:bg-gray-50">
      <Printer className="text-cerulean-500" />
    </ButtonIcon>
  );
};

export const IconOrangeWhite = (): React.ReactNode => {
  return (
    <ButtonIcon className="bg-tangerine-500 hover:bg-tangerine-800">
      <Book className="text-white" />
    </ButtonIcon>
  );
};

export const IconCircle = (): React.ReactNode => {
  return (
    <ButtonIcon className="rounded-full bg-gray-300 hover:bg-gray-500">
      <X />
    </ButtonIcon>
  );
};
