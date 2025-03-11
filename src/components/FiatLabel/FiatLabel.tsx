import React, { useState, useEffect, FunctionComponent } from "react";

/**
 * e.g. <FiatLabel>15.4</FiatLabel>
 * **Do not pass in anything else other than number**
 * @param children - number
 * @returns $15.4
 */
export const FiatLabel: FunctionComponent<{ children: number }> = ({ children, ...options }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(0);
    setTimeout(() => setOpacity(1), 100);
  }, [children]);

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });
  const res = children === 0 ? "FREE" : nf.format(Number(children));
  return <span style={{ opacity, transition: "opacity 1s ease-in" }}>{res}</span>;
};
