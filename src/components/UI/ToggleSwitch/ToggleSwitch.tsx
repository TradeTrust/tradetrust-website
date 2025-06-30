import React, { FunctionComponent } from "react";

export interface ToggleProps {
  isOn: boolean;
  handleToggle: () => void;
}
/**
 * ToggleSwitch is a controlled component, depending on the state it is in,
 * it will render the on or off text accordingly
 * @param isOn state of toggle
 * @param handleToggle toggle handler, a callback that invokes if the state
 * changes
 */
export const ToggleSwitch: FunctionComponent<ToggleProps> = ({ isOn, handleToggle }) => {
  return (
    <label data-testid="toggle-switch-label" className="flex items-center cursor-pointer">
      <div className="relative">
        <input checked={isOn} className="hidden" onChange={handleToggle} type="checkbox" data-testid="toggle-switch" />
        <div className={`block ${isOn ? `bg-forest-500` : `bg-cloud-200`} w-16 h-8 rounded-2xl`} />
        <div
          className={`w-full absolute top-1 transform duration-100 ${
            isOn ? `right-2 translate-x-2/3` : `left-1 translate-x-0`
          }`}
        >
          <div className={`dot rounded-xl bg-white w-6 h-6`} />
        </div>
        <div className={`text-sm absolute top-1.5 right-1.5 text-white${isOn ? " hidden" : ""}`}>OFF</div>
        <div className={`text-sm absolute top-1.5 left-1.5 text-white${isOn ? "" : " hidden"}`}>ON</div>
      </div>
    </label>
  );
};
