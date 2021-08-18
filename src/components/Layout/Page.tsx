import React from "react";

export const Page: React.FunctionComponent<{ title?: string }> = ({ title, children }) => {
  return (
    <div className="container py-12">
      {title && (
        <h2 className="text-gray-700" data-testid="page-title">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
