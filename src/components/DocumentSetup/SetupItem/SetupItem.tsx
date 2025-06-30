import React, { FunctionComponent } from "react";
import { CreatorItemState } from "../../../common/contexts/CreatorContext";
import { LoaderSpinner } from "../../UI/Loader";
import { IconError, IconSuccess } from "../../UI/Icon";

export interface SetupItemProps {
  state: CreatorItemState;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
}

export const SetupItem: FunctionComponent<SetupItemProps> = ({ state, title, description }) => {
  return (
    <div id="setup-item" className="flex flex-row">
      <div id="setup-item-state" className="flex w-9 h-9 p-2 justify-start items-start">
        {state === CreatorItemState.LOADING && <LoaderSpinner width={"20px"} primary="#2D5FAA" secondary="#2D5FAA50" />}
        {state === CreatorItemState.ERROR && <IconError className="text-scarlet-500 w-5 h-5" />}
        {state === CreatorItemState.SUCCESS && <IconSuccess className="text-forest-500 w-5 h-5" />}
      </div>
      <div id="setup-item-content" className="flex-1 p-1">
        {title && (
          <div id="setup-item-title" className="text-sm font-medium p-1">
            {title}
          </div>
        )}
        {description && (
          <div id="setup-item-description" className="text-sm p-1 text-cloud-400">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
