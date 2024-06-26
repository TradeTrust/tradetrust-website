import React from "react";

export const Page: React.FunctionComponent<{ title?: string; subtitle?: string }> = ({ title, subtitle, children }) => {
  return (
    <div className="container py-12">
      {title && (
        <>
          <h2 className="text-cloud-800 max-w-3xl" data-testid="page-title">
            {title}
          </h2>
          {subtitle && (
            <h4 className="text-cloud-800" data-testid="page-subtitle">
              {subtitle}
            </h4>
          )}
        </>
      )}
      {children}
    </div>
  );
};
