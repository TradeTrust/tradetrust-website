import { useState, useEffect } from "react";

export const useShowMetaMaskPopup = (account: string | null, currentChainId: number | null) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkConditions = () => {
      const isModelVisible = !!document.querySelector('[data-testid="documentSetup"]');
      const pathname = window.location.pathname;
      const isTargetRoute = ["/creator/form", "/creator/form-preview", "/creator/publish"].includes(pathname);

      const storedAccount = sessionStorage.getItem("account");
      const storedChainIdRaw = sessionStorage.getItem("chainId");

      if (!storedAccount || !storedChainIdRaw) {
        setShowPopup(false);
        return;
      }

      const storedChainId = parseInt(storedChainIdRaw, 10);
      const isAccountDifferent = storedAccount !== account;
      const isChainIdDifferent = storedChainId !== currentChainId;

      const shouldShow = (isModelVisible || isTargetRoute) && (isAccountDifferent || isChainIdDifferent);
      setShowPopup(shouldShow);
    };

    checkConditions();

    const observer = new MutationObserver(checkConditions);
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = setInterval(checkConditions, 500);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [account, currentChainId]);

  return showPopup;
};
