import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import styles from "./certificateViewer.scss";
import { getTemplates, getActiveTemplateTab } from "../reducers/certificate";
import { ButtonBorderedBlue } from "./UI/Button";
import Drawer from "./UI/Drawer";

const MultiTabs = ({
  activeTab,
  templates,
  selectTemplateTab,
  isOverlayVisible,
  setOverlayVisible,
  tokenRegistryAddress,
}) => {
  return (
    <div id={styles["header-ui"]} className="pt-3 pt-md-0">
      <div className={`${styles["header-container"]}`}>
        <ul id="template-tabs-list" className="nav nav-tabs row no-gutters align-items-center">
          <li className="nav-item col-auto col-md-auto ml-md-auto order-md-2">
            <a href=" " className="my-auto ml-auto">
              <ButtonBorderedBlue>View another</ButtonBorderedBlue>
            </a>
          </li>
          {tokenRegistryAddress && (
            <li className="nav-item col-auto col-md-auto ml-2 order-md-2">
              <ButtonBorderedBlue
                onClick={() => {
                  setOverlayVisible(!isOverlayVisible);
                }}
              >
                Address Book
              </ButtonBorderedBlue>
            </li>
          )}
          {templates && templates.length > 0
            ? templates.map((t, idx) => (
                <li key={idx} className="nav-item col-12 col-md-auto">
                  <a
                    className={`${styles.tab} ${idx === activeTab ? styles.active : ""}`}
                    id={t.id}
                    onClick={() => {
                      selectTemplateTab(idx);
                    }}
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    {t.label}
                  </a>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="d-lg-none d-xl-none">
        <Drawer tabs={templates} activeIdx={activeTab} toggle={(idx) => selectTemplateTab(idx)} />
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  templates: getTemplates(store),
  activeTab: getActiveTemplateTab(store),
});

export default connect(mapStateToProps, null)(MultiTabs);

MultiTabs.propTypes = {
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func,
  activeTab: PropTypes.number,
};
