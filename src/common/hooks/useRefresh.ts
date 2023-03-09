import { useEffect, useRef, useState } from "react";

export const useRefresh = (period: number): number | undefined => {
  const [tick, setTick] = useState(0);
  const isTabActive = useRef(true);

  useEffect(() => {
    const activeHandler = () => {
      isTabActive.current = !document.hidden;
    };
    window.addEventListener("visibilitychange", activeHandler);
    return () => window.removeEventListener("visibilitychange", activeHandler);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTabActive.current) setTick((ticking) => ticking + 1);
    }, period);
    return () => clearInterval(interval);
  }, [period]);

  if (period < 1) return undefined;

  return tick;
};
