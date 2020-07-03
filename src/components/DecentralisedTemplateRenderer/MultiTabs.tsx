import React from "react";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { Nav } from "react-bootstrap";
import { TemplateProps } from "./../../types";

interface MultiTabsProps {
  className?: string;
  hasAttachments: boolean;
  attachments?: {
    filename: string;
    data: string;
    type: string;
  }[];
  templates: TemplateProps[];
  setSelectedTemplate: (id: string) => void;
  selectedTemplate: string;
}

export const MultiTabs = styled(
  ({ className, hasAttachments, attachments, templates, setSelectedTemplate, selectedTemplate }: MultiTabsProps) => {
    return (
      <div className={`${className} container-custom`}>
        <Nav variant="tabs" data-testid="tabs">
          {templates.map(({ id, label }) => (
            <Nav.Item key={id} data-testid={id}>
              <Nav.Link
                active={id === selectedTemplate}
                eventKey={`tab-document`} // Handled by react bootstrap's Tab
                onClick={() => {
                  setSelectedTemplate(id);
                }}
              >
                <span className="nav-text">{label}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
          {hasAttachments && (
            <Nav.Item>
              <Nav.Link
                eventKey="tab-attachment" // Handled by react bootstrap's Tab
                data-testid="tab-attachment"
                onClick={() => {
                  setSelectedTemplate(""); // To unset the last active tab
                }}
              >
                Attachments
                <span className="attachment-number" data-testid="attachment-number">
                  {attachments && attachments.length}
                </span>
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </div>
    );
  }
)`
  padding-top: 10px;

  .nav-tabs {
    border-bottom: 0;
    margin-top: 20px;

    @media only screen and (min-width: ${vars.lg}) {
      margin-top: 0;
    }

    .nav-link {
      transition: color 0.3s ${vars.easeOutCubic}, background-color 0.3s ${vars.easeOutCubic};
      ${mixin.fontSourcesansproBold};
      border: 0;
      z-index: 1;
      position: relative;
      display: inline-block;
      padding: 16px;
      text-decoration: none;
      cursor: pointer;
      text-transform: uppercase;
      margin: 0 7px;
      border-radius: 0;
      background-color: #eee;
      color: ${vars.greyDark};

      &:first-of-type {
        margin-left: 0;
      }

      &:hover {
        color: ${vars.black};
        background-color: ${vars.greyLighter};
      }

      &.active {
        color: ${vars.brandBlue};
        background-color: ${vars.white};
        pointer-events: none;

        &::before {
          display: block;
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: ${vars.brandBlue};
        display: none;
      }
    }
  }

  .nav-text {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 30px;

    @media only screen and (min-width: ${vars.md}) {
      max-width: 45px;
    }

    @media only screen and (min-width: ${vars.lg}) {
      max-width: 90px;
    }

    @media only screen and (min-width: ${vars.xl}) {
      max-width: 180px;
    }
  }

  .attachment-number {
    background-color: #bbb;
    color: ${vars.white};
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 4px;
  }
`;
