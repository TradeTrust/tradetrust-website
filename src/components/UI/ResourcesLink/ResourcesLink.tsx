import styled from "@emotion/styled";
import React, { FunctionComponent } from "react";
import { Download } from "react-feather";
import { mixin, vars } from "../../../styles";
import { ResourcesLinkProps } from "../../../types";

export const ResourcesLink: FunctionComponent<ResourcesLinkProps> = ({ title, details, type, icon }) => {
  return (
    <ResourcesLinkItem>
      <div className="link-wrapper">
        <div className="title">{title}</div>
        {details.map((details, index) => (
          <div className="link-container" key={index}>
            {type === "link" && (
              <a className="link" href={details.url} target="_blank" rel="noopener noreferrer" data-testid="link">
                {details.title}
              </a>
            )}
            {details.date && (
              <>
                <div className="date">{details.date}</div>
                <hr />
              </>
            )}
            {type === "download" && (
              <div className="download-wrapper">
                <a href={details.url} download={`${details.title}.pdf`} className="link" data-testid="download">
                  <Download className="mr-1" />
                  {details.title}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      {icon && <img src={icon} className="link-icon" data-testid="link-icon" />}
    </ResourcesLinkItem>
  );
};

const ResourcesLinkItem = styled.div`
  background-color: ${vars.white};
  padding: 8px 12px 12px 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  display: flex;

  .link-wrapper {
    flex-grow: 1;
  }
  .link-icon {
    object-fit: contain;
  }

  .title {
    color: ${vars.greyDark};
    ${mixin.fontSize(20)};
    ${mixin.fontSourcesansproSemibold};
  }

  .date {
    color: ${vars.grey};
    ${mixin.fontSize(16)};
    ${mixin.fontSourcesansproSemibold};
  }

  .link-container {
    padding-top: 0.5rem;
  }

  .link {
    ${mixin.fontSize(16)};
    ${mixin.fontSourcesansproSemibold};
    display: flex;
    align-items: flex-end;
  }

  .download-wrapper {
    display: flex;
  }
`;
