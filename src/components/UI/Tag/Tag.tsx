import React, { FunctionComponent } from "react";

interface TagProps {
  id?: string;
  className?: string;
  rounded?: string;
  children: React.ReactNode;
}

export const Tag: FunctionComponent<TagProps> = ({ className, rounded = "rounded-lg", children, ...props }) => {
  return (
    <div className={`inline-block py-1 px-2 ${rounded} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const TagBordered: FunctionComponent<TagProps> = ({ className, children, ...props }) => {
  return (
    <Tag className={`border-solid border ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const TagBorderedSm: FunctionComponent<TagProps> = ({ className, children, ...props }) => {
  return (
    <TagBordered className={`text-sm ${className}`} {...props}>
      {children}
    </TagBordered>
  );
};

export const TagBorderedLg: FunctionComponent<TagProps> = ({ className, children, ...props }) => {
  return (
    <TagBordered className={`border-4 text-4xl py-2 px-4 font-gilroy-bold ${className}`} {...props}>
      {children}
    </TagBordered>
  );
};
