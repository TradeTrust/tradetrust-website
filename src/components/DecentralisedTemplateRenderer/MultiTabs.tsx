import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import { mixin, vars } from "../../styles";
import { ButtonBorderedBlue } from "../UI/Button";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { AddressBook } from "./../../components/UI/Overlay/OverlayContent/AddressBook";
import { Nav } from "react-bootstrap";

interface MultiTabsProps {
  className: string;
  tokenRegistryAddress: string;
  attachments?: [];
}

export const MultiTabs = styled(({ className, tokenRegistryAddress, attachments }) => {
  const { showOverlay } = useContext(OverlayContext);
  const onOverlayHandler = () => {
    showOverlay(<AddressBook title="Address Book" data-testid="overlay-addressbook" />);
  };

  return (
    <div className={className}>
      <div className="container-custom">
        <ul id="template-tabs-list" className="nav nav-tabs row no-gutters align-items-center">
          <li className="nav-item col-auto col-md-auto ml-md-auto order-md-2">
            <NavLink className="my-auto ml-auto" to="/">
              <ButtonBorderedBlue>View another</ButtonBorderedBlue>
            </NavLink>
          </li>
          {tokenRegistryAddress && (
            <li className="nav-item col-auto col-md-auto ml-2 order-md-2">
              <ButtonBorderedBlue onClick={onOverlayHandler}>Address Book</ButtonBorderedBlue>
            </li>
          )}
          <li className="nav-item col-12 col-md-auto">
            <Nav variant="tabs" data-testid="document-tabs">
              <Nav.Item>
                <Nav.Link eventKey="tab-document" data-testid="tab-document">
                  Document
                </Nav.Link>
              </Nav.Item>
              {attachments && (
                <Nav.Item>
                  <Nav.Link eventKey="tab-attachment" data-testid="tab-attachment">
                    Attachments{" "}
                    <span className="attachment-number" data-testid="attachment-number">
                      {attachments.length}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </li>
        </ul>
      </div>
    </div>
  );
})`
  padding-top: 10px;

  .nav-tabs {
    border-bottom: 0;
    margin-top: 20px;

    @media only screen and (min-width: ${vars.lg}) {
      margin-top: 0;
    }

    .nav-link {
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
        color: ${vars.brandNavy};
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

  .attachment-number {
    background-color: #bbb;
    color: ${vars.white};
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 4px;
  }
`;
