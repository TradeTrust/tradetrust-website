import React, { Component } from "react";
import css from "./drawer.scss";

interface DrawerProps {
  toggle: (index: number) => void;
  tabs: any[];
  activeIdx: number;
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
      showAbsHeader: false
    };
  }

  toggleDrawer() {
    this.setState({ visible: !this.state.visible });
  }

  createTabs(tabs: any[]) {
    const { activeIdx } = this.props;
    return tabs.map((tab, idx) => (
      <a
        href=""
        className={`${css.tabs} ${activeIdx === idx ? css.active : ""} `}
        key={idx}
        onClick={e => {
          e.preventDefault();
          this.renderContent(idx);
        }}
      >
        {tab.label}
      </a>
    ));
  }

  renderContent(idx: number) {
    this.props.toggle(idx);
    this.toggleDrawer();
  }

  render() {
    const { tabs, children } = this.props;
    const { visible, showAbsHeader } = this.state;

    return (
      <>
        {visible ? (
          <div id="mySidenav" className={css.sidenav}>
            <a
              href=""
              className={css.closebtn}
              onClick={e => {
                e.preventDefault();
                this.toggleDrawer();
              }}
            >
              &times;
            </a>
            {this.createTabs(tabs)}
          </div>
        ) : null}
        <div className={`${css.gray} ${showAbsHeader ? "" : css["mb-sidenav"]} container-fluid`}>
          <div className={css.togglebtn} onClick={() => this.toggleDrawer()}>
            &#9776;
          </div>
        </div>

        <div id="main">{children}</div>
      </>
    );
  }
}
