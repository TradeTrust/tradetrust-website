import React, { FunctionComponent } from "react";
import { ObjectFieldTemplateProps } from "@rjsf/core";

// Title UI should be reused in custom array item
export const CustomTitle: FunctionComponent<{ title: string }> = ({ title }) => {
  return (
    <>
      {title && <div className="border-t border-cloud-200 my-16" data-testid="custom-title-divider" />}
      {title && <h4 className="text-cloud-800 capitalize my-4">{title}</h4>}
    </>
  );
};

export const CustomObjectFieldTemplate: FunctionComponent<ObjectFieldTemplateProps> = ({
  properties,
  title,
  description,
}) => {
  return (
    <>
      <CustomTitle title={title} />
      <ul>
        {properties.map(
          (
            prop: { content: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined },
            index: React.Key | null | undefined
          ) => (
            <li className="my-4" key={index}>
              {prop.content}
            </li>
          )
        )}
      </ul>
      {description}
    </>
  );
};
