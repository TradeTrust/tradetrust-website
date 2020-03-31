import React from "react";

export const PrintWatermark = () => (
  <div>
    <img
      style={{
        position: "absolute",
        opacity: 0.5,
        width: "100%",
        height: "100%",
      }}
      src="/static/images/watermark.svg"
      alt="PrintWatermark"
    />
  </div>
);
