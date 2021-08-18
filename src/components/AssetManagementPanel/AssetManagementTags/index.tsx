import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";

export const AssetManagementTags: FunctionComponent = () => {
  return (
    <div className="container">
      <div className="flex w-full py-2">
        <Tag className="text-white bg-cloud-300 rounded-md font-bold mr-2 mb-2">Transferable</Tag>
        <Tag className="text-white bg-cloud-300 rounded-md font-bold mr-2 mb-2">Negotiable</Tag>
      </div>
    </div>
  );
};
