import React, { FunctionComponent } from "react";
import { ChevronLeft } from "react-feather";

export const BackArrow: FunctionComponent = () => (
  <div className="flex items-center mb-4">
    <ChevronLeft className="text-cloud-800" />
    <h5 className="text-cloud-800">Back</h5>
  </div>
);

export interface TileInfoProps {
  title: string;
  description: string;
  tileIcon: React.ReactElement;
}

export const TileInfo: FunctionComponent<TileInfoProps> = ({ title, description, tileIcon }) => (
  <div
    className="max-w-sm w-100 p-4 border font-normal rounded-xl bg-white shadow-xl transition-colors duration-200 hover:bg-gray-50"
    style={{ minHeight: "120px" }}
  >
    <div className="flex flex-nowrap items-center">
      <div className="w-3/4 md:w-5/6 mr-4">
        <h3 className="text-cerulean-300">{title}</h3>
        <p className="text-cloud-800 mt-1">{description}</p>
      </div>
      <div className="w-1/4 md:w-1/6 m-auto">{tileIcon}</div>
    </div>
  </div>
);
