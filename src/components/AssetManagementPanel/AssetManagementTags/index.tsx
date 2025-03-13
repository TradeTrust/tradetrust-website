import React, { FunctionComponent } from "react";
import { Tag } from "../../UI/Tag";

export const AssetManagementTags: FunctionComponent = () => {
  const tagCSS = "text-tangerine-500 bg-white border border-cloud-100 rounded-md font-gilroy-bold";
  return (
    <div className="flex flex-wrap py-2 gap-2">
      <Tag className={tagCSS}>Transferable</Tag>
      <Tag className={tagCSS}>Negotiable</Tag>
    </div>
  );
};
