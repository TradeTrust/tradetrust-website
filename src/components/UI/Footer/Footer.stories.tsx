import React from "react";
import { Footer } from "./";
import { FooterColumnItemProps } from "./types";

export default {
  title: "UI/Footer",
  component: Footer,
  parameters: {
    componentSubtitle: "Footer",
  },
};

const render = ({ label }: FooterColumnItemProps): React.ReactElement => <div>{label}</div>;
const renderSomethingElse = ({ to }: FooterColumnItemProps): React.ReactElement => <div>{to}</div>;
const renderSpecial = ({ someOther }: FooterColumnItemProps): React.ReactElement => <div>{someOther}</div>;
const bottomRender = ({ label, to }: FooterColumnItemProps): React.ReactElement => (
  <a href={to} className="text-cloud-500 text-sm px-4 border-r">
    {label}
  </a>
);
const data = [
  {
    category: "Category A",
    items: [
      {
        label: "sdfsdf",
        to: "somewhe",
        render: renderSpecial,
        someOther: "A-1",
      },
      { label: "A-2", to: "https://google.com" },
      { label: "A-3", to: "somewhere", render },
    ],
  },
  {
    category: "Category B",
    items: [
      { label: "label", to: "B-1", render: renderSomethingElse },
      { label: "B-2", to: "somewhere", render },
    ],
  },
  {
    category: "Category C",
    items: [
      { label: "C-1", to: "somewhere", render },
      { label: "label", to: "C-2", render: renderSomethingElse },
      { label: "C-3", to: "somewhere", render },
      { label: "label", to: "C-4", render: renderSomethingElse },
    ],
  },
  {
    category: "Category D",
    items: [
      { label: "D-1", to: "somewhere", render },
      { label: "D-2", to: "somewhere", render },
      { label: "D-3", to: "somewhere", render },
    ],
  },
  {
    category: "Category E",
    items: [{ label: "E-1", to: "somewhere", render }],
  },
];
const legalData = {
  copyright: "Copyright \u00A9 2020",
  items: [
    { label: "Privacy Policy", to: "https://google.com", render: bottomRender },
    { label: "Terms of use", to: "https://yahoo.com", render: bottomRender },
  ],
};

export const Title: React.FunctionComponent = () => {
  return <Footer title={"Title"} legalData={legalData} data={data} />;
};

export const Logo: React.FunctionComponent = () => {
  return <Footer logoUrl={"/static/images/tradetrust_logo.svg"} legalData={legalData} data={data} />;
};
