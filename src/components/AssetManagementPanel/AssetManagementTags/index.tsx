import React, { FunctionComponent } from "react";
import { TagSolidTeal } from "../../UI/Tag";

export const AssetManagementTags: FunctionComponent = () => {
  return (
    <div className="flex w-full py-2">
      <TagSolidTeal>Transferable</TagSolidTeal>
      <TagSolidTeal>Negotiable</TagSolidTeal>
    </div>
  );
};
