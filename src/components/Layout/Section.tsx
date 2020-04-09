import React from "react";

interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const Section = ({ className, children, ...props }: SectionProps) => {
  return (
    <section className={className} {...props}>
      <div className="container-custom">
        <div className="row">
          <div className={`col-12`}>{children}</div>
        </div>
      </div>
    </section>
  );
};
