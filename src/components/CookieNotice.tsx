import React, { useEffect, useState } from "react";
import { Button, ButtonSize } from "./Button";
import Cookies from "js-cookie";

const COOKIE_KEY = "cookieNotice";
const COOKIE_CLOSED_VALUE = "closed";

const CookieNotice: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieValue = Cookies.get(COOKIE_KEY);
    if (!cookieValue || cookieValue !== COOKIE_CLOSED_VALUE) {
      setVisible(true);
      setTimeout(() => setShow(true), 30);
    }
  }, []);

  const handleClose = () => {
    Cookies.set(COOKIE_KEY, COOKIE_CLOSED_VALUE, { expires: 30, path: "/" });
    setShow(false);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full py-4 px-4 flex items-center justify-center z-[100] bg-white bg-opacity-90 border-t border-gray-200 transition-transform duration-300 ease-in-out 
        ${show ? "translate-y-0" : "translate-y-full"} shadow-lg`}
    >
      <span className="text-gray-800 text-base">
        To offer you a better experience, this site uses cookies. Read more about cookies in our{" "}
        <a
          href="/privacy-policy"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
        >
          Privacy Statement
        </a>
        .
      </span>

      <Button
        className="ml-2 bg-transparent text-cerulean-500 hover:bg-cloud-200 border border-gray-300"
        size={ButtonSize.SM}
        onClick={handleClose}
      >
        Close
      </Button>
    </div>
  );
};

export default CookieNotice;
