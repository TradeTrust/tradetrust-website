import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";

export const AssetManagementTags: FunctionComponent = () => {
  return (
    <div className="flex w-full py-2">
      <Tag className="text-white bg-turquoise mr-2 mb-2">Transferable</Tag>
      <Tag className="text-white bg-turquoise mr-2 mb-2">Negotiable</Tag>
    </div>
  );
};
