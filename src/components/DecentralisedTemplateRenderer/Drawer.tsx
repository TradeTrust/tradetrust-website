import styled from "@emotion/styled";
import React, { Component } from "react";
import { mixin, vars } from "../../styles";

const DrawerAside = styled.aside`
  .sidenav {
    height: 100%;
    width: 70%;
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    background-color: ${vars.brandNavy};
    overflow-x: hidden;
    transition: color 0.3s ${vars.easeOutCubic};

    .tabs {
      border-bottom: 0.1px solid ${vars.greyblueDark};

      &.active {
        color: ${vars.greyblue};
      }
    }

    a {
      padding: 8px 8px 8px 32px;
      text-decoration: none;

      ${mixin.fontSize(25)}
      color: ${vars.white};
      display: block;
      transition: color 0.3s ${vars.easeOutCubic};

      &:hover {
        color: ${vars.greyblue};
      }
    }

    .closebtn {
      ${mixin.fontSize(36)}
    }
  }

  .mb-sidenav {
    position: absolute;
    top: 15px;
    right: 15px;
    z-index: 2;
    text-align: right;
    height: 50px;
    max-width: 50px;
  }

  .togglebtn {
    ${mixin.fontSize(35)}
    display: block;
    text-align: right;
    color: ${vars.white};
    cursor: pointer;
  }
`;

interface DrawerProps {
  templates: { id: string; label: string }[];
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
}

interface DrawerState {
  visible: boolean;
  showAbsHeader: boolean;
}

export class Drawer extends Component<DrawerProps, DrawerState> {
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      visible: false,
      showAbsHeader: false,
    };
  }

  toggleDrawer() {
    this.setState({ visible: !this.state.visible });
  }

  createTabs(templates: DrawerProps["templates"]) {
    const { selectedTemplate } = this.props;
    return templates.map(({ id, label }) => (
      <a
        href=""
        className={`tabs ${selectedTemplate === id ? "active" : ""} `}
        key={id}
        onClick={(e) => {
          e.preventDefault();
          this.renderContent(id);
        }}
      >
        {label}
      </a>
    ));
  }

  renderContent(id: string) {
    this.props.onSelectTemplate(id);
    this.toggleDrawer();
  }

  render() {
    const { templates, children } = this.props;
    const { visible, showAbsHeader } = this.state;

    return (
      <DrawerAside>
        {visible ? (
          <div id="mySidenav" className="sidenav">
            <a
              href=""
              className="closebtn"
              onClick={(e) => {
                e.preventDefault();
                this.toggleDrawer();
              }}
            >
              &times;
            </a>
            {this.createTabs(templates)}
          </div>
        ) : null}
        <div className={`bg-navy ${showAbsHeader ? "" : "mb-sidenav"}`}>
          <div className="togglebtn" onClick={() => this.toggleDrawer()}>
            &#9776;
          </div>
        </div>
        <div id="main">{children}</div>
      </DrawerAside>
    );
  }
}
