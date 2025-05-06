import React from "react";

interface CardProps {
  title?: React.ReactElement;
  children: React.ReactNode;
}

export const Card: React.FunctionComponent<CardProps> = ({ title, children }: CardProps) => {
  return (
    <div className="-mx-4 rounded-none xs:rounded-lg shadow-md bg-white p-4 mt-4 mb-8">
      {title && <div className="mb-4">{title}</div>}
      <div className="m-4">{children}</div>
    </div>
  );
};
