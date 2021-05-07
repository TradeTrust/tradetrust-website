import React, { FunctionComponent } from "react";

interface SectionProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section: FunctionComponent<SectionProps> = ({ children, ...props }) => {
  return (
    <section {...props}>
      <div className="container">
        <div className="flex">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  );
};
