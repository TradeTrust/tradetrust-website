import React, { Component } from "react";
import css from "./drawer.scss";

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
        className={`${css.tabs} ${selectedTemplate === id ? css.active : ""} `}
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
      <>
        {visible ? (
          <div id="mySidenav" className={css.sidenav}>
            <a
              href=""
              className={css.closebtn}
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
        <div className={`bg-brand-navy ${showAbsHeader ? "" : css["mb-sidenav"]}`}>
          <div className={css.togglebtn} onClick={() => this.toggleDrawer()}>
            &#9776;
          </div>
        </div>

        <div id="main">{children}</div>
      </>
    );
  }
}
