import { connect } from "react-redux";
import React, { FunctionComponent } from "react";
import styles from "./certificateViewer.scss";
import { getActiveTemplateTab, getTemplates } from "../reducers/certificate";
import { Drawer } from "./UI/drawer";

interface MultiTabsProps {
  templates: any[];
  selectTemplateTab: (index: number) => void;
  activeTab?: number;
}
export const MultiTabs: FunctionComponent<MultiTabsProps> = ({ activeTab = 0, templates, selectTemplateTab }) => (
  <div id={styles["header-ui"]}>
    <div className={`${styles["header-container"]} d-none d-lg-block d-xl-block`}>
      <div id="template-tabs-list" className="nav nav-tabs">
        {templates && templates.length > 0
          ? templates.map((t, idx) => (
              <li key={idx} className="nav-item">
                <a
                  className={`${styles.tab}
                    ${idx === activeTab ? styles.active : ""}`}
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
        <a id="btn-view-another" href=" " className={styles["view-another"]}>
          View another
        </a>
      </div>
    </div>
    <div className="d-lg-none d-xl-none">
      <Drawer tabs={templates} activeIdx={activeTab} toggle={idx => selectTemplateTab(idx)} />
    </div>
  </div>
);

const mapStateToProps = (store: any) => ({
  templates: getTemplates(store),
  activeTab: getActiveTemplateTab(store)
});

export const MultiTabsContainer = connect(
  mapStateToProps,
  null
)(MultiTabs);
