import React from "react";

interface SectionProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, ...props }: SectionProps) => {
  return (
    <section {...props}>
      <div className="container-custom">
        <div className="row">
          <div className={`col-12`}>{children}</div>
        </div>
      </div>
    </section>
  );
};
