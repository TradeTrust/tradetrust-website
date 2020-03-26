import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styles from "./certificateViewer.scss";
import { getTemplates, getActiveTemplateTab } from "../reducers/certificate";
import { FeatureFlag } from "./FeatureFlag";
import { OverlayAddressBook, OverlayAddressBookActionsBar, OverlayAddressBookTable } from "./UI/Overlay";
import { useAddressBook } from "../common/hooks/useAddressBook";
import { ButtonBordered } from "./UI/Button";
import Drawer from "./UI/Drawer";

const MultiTabs = ({ activeTab, templates, selectTemplateTab }) => {
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const { addressBook } = useAddressBook();

  return (
    <>
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
            <a href=" " className="my-auto ml-auto">
              <ButtonBordered bg="tertiary">View another</ButtonBordered>
            </a>
            <FeatureFlag name="ADDRESS_BOOK_UPLOAD">
              <div className="my-auto ml-2">
                <ButtonBordered
                  bg="tertiary"
                  onClick={() => {
                    setOverlayVisible(!isOverlayVisible);
                  }}
                >
                  Upload Address Book
                </ButtonBordered>
                <OverlayAddressBook
                  id="overlay-addressbook"
                  title="Address Book"
                  isOverlayVisible={isOverlayVisible}
                  onClick={() => {
                    setOverlayVisible(!isOverlayVisible);
                  }}
                >
                  <OverlayAddressBookActionsBar />
                  <OverlayAddressBookTable addressBook={addressBook} />
                </OverlayAddressBook>
              </div>
            </FeatureFlag>
          </div>
        </div>
        <div className="d-lg-none d-xl-none">
          <Drawer tabs={templates} activeIdx={activeTab} toggle={idx => selectTemplateTab(idx)} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = store => ({
  templates: getTemplates(store),
  activeTab: getActiveTemplateTab(store)
});

export default connect(mapStateToProps, null)(MultiTabs);

MultiTabs.propTypes = {
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func,
  activeTab: PropTypes.number
};
