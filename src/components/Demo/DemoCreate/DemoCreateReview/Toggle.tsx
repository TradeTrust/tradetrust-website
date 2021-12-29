// TODO move to tt-ui-components
import React, { FunctionComponent } from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle?: () => void;
}

export const ToggleSwitch: FunctionComponent<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <label data-testid="toggle-switch-label" className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          checked={isOn}
          className="hidden"
          onChange={handleToggle}
          type="checkbox"
          id="toggle-switch"
          data-testid="toggle-switch"
        />
        <div className={`block ${isOn ? `bg-emerald` : `bg-cloud-200`} w-16 h-8 rounded-2xl`} />
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
