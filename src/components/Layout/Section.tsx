import React from "react";

interface SectionProps {
  columnClass?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Section = ({ className, columnClass = "", children, ...props }: SectionProps) => {
  return (
    <section className={className} {...props}>
      <div className="container-custom">
        <div className="row">
          <div className={`col-12 ${columnClass}`}>{children}</div>
        </div>
      </div>
    </section>
  );
};
