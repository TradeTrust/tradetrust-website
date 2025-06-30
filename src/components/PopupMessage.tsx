import React, { useState, useEffect } from "react";
import { Checkbox } from "./UI/Checkbox";
import { URLS } from "../constants";
import { Button, ButtonSize } from "./Button";
import { IconSuccess } from "./UI/Icon";

const PopupMessage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  // Check if the user has already seen the popup or opted to not show it again
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleClosePopup = () => {
    if (doNotShowAgain) {
      localStorage.setItem("hasSeenPopup", "true");
    }
    setShowPopup(false);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoNotShowAgain(event.target.checked);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-auto text-center">
        {/* Text content */}
        <div className="text-left mb-4">
          <h2 className="text-xl font-bold">
            <IconSuccess className="text-forest-500 mr-2" />
            Latest Document Updates
          </h2>
          <p className="mt-4">Here&apos;s why you should update and issue your files in the latest iteration:</p>
          <ul className="mt-2 list-disc list-inside">
            <li>Latest iteration enabled new functions that can help you better align with the IG P&I requirement:</li>
            <ul className="mt-1 list-disc list-inside pl-6">
              <li>
                Reject function - Received a wrongfully transferred document, you may now reject it to where it came
                from!
              </li>
              <li>Remark column - Any actions you take for your transferable document can now include a remark!</li>
            </ul>
          </ul>
        </div>

        {/* Do not show again checkbox */}
        <div className="mt-4 flex items-center">
          <Checkbox id="doNotShowAgain" checked={doNotShowAgain} onChange={handleChangeCheckbox}>
            Do not show this again
          </Checkbox>
        </div>

        {/* Buttons - Dismiss and Learn More */}
        <div className="flex justify-end mt-6 space-x-4">
          {/* Dismiss Button */}
          <Button
            className="bg-white text-cerulean-500 hover:bg-cloud-100"
            size={ButtonSize.MD}
            onClick={handleClosePopup}
          >
            Dismiss
          </Button>

          {/* Learn More Button */}
          <a href={URLS.DOCS} target="_blank" rel="noopener noreferrer">
            <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800" size={ButtonSize.MD}>
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
