import styled from "@emotion/styled";
import React, { Component } from "react";
import tw from "twin.macro";

const DrawerAside = styled.aside`
  .sidenav {
    ${tw`fixed h-full top-0 right-0 bg-navy overflow-x-hidden transition duration-300 ease-out`}
    width: 70%;
    z-index: 999;

    .tabs {
      ${tw`border border-solid border-greyblue-700`}

      &.active {
        ${tw`text-greyblue`}
      }
    }

    a {
      ${tw`py-2 pr-2 pl-8 no-underline text-2xl text-white block transition duration-300 ease-out hover:text-greyblue`}
    }

    .closebtn {
      ${tw`text-4xl`}
    }
  }

  .mb-sidenav {
    ${tw`absolute text-right`}
    top: 15px;
    right: 15px;
    z-index: 2;
    height: 50px;
    max-width: 50px;
  }

  .togglebtn {
    ${tw`block text-4xl text-right text-white cursor-pointer`}
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
