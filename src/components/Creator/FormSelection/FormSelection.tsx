import React, { FunctionComponent, useContext, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { useLocation } from "react-router-dom";
import { OverlayContext } from "../../../common/contexts/OverlayContext";
import { paths } from "../../../config/routes-config";
import ConnectToBlockchainModel from "../../ConnectToBlockchain";
import { DocumentSetup, DocumentSetupType } from "../../DocumentSetup/DocumentSetup";
import { FormSelect } from "../FormSelect";
import { FormTypes } from "../types";

interface FormSelection {
  forms: any;
  formTypes: FormTypes[];
}

export const FormSelection: FunctionComponent<FormSelection> = ({ forms, formTypes }) => {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const { showOverlay } = useContext(OverlayContext);
  const { pathname } = useLocation();

  const toggleExpand = (typeID: number) => {
    setExpanded((prev) => ({
      ...prev,
      [typeID]: !prev[typeID],
    }));
  };

  const onCreateDocumentClick = (type: FormTypes, formName: string) => {
    sessionStorage.removeItem("account");
    sessionStorage.removeItem("chainId");
    let overlay;
    if (type === "Transferable") {
      const nextStep = (
        <DocumentSetup
          types={[DocumentSetupType.DID_WEB, DocumentSetupType.TOKEN_REGISTRY]}
          formName={formName}
          isTransferable
        />
      );
      overlay = (
        <ConnectToBlockchainModel
          collapsible={false}
          nextStep={nextStep}
          showNetworkSection={pathname === paths.creator}
        />
      );
    } else if (type === "Non-Transferable") {
      overlay = <DocumentSetup types={[DocumentSetupType.DID_WEB]} formName={formName} />;
    }

    showOverlay(overlay);
  };

  return (
    <div className="-mx-4 rounded-none xs:rounded-lg shadow-md bg-white p-4 mt-4">
      <div className="p-4">
        <h4 data-testid="form-selection-title">Select documents to preview or create.</h4>
        <p>Purely for testing; no real-world validity or enforceability. These documents are void after 30 days.</p>
        <div className="flex items-start gap-2 text-red-600 font-medium mt-2">
          <img className="h-5 w-5 mt-0.5" src="/static/images/alert/warning.png" alt="Warning" />
          <span>Do not make any changes to MetaMask during issuance, or the process may fail.</span>
        </div>
      </div>
      <hr className="m-4" />
      {formTypes.map((type: FormTypes, id: number) => (
        <React.Fragment key={`form-type-${type}-${id}`}>
          <div>
            <div id="forms-header" className="flex items-center gap-4 py-4 px-3">
              <div
                data-testid={`toggle-expand-${type}`}
                onClick={() => toggleExpand(id)}
                className="flex items-center justify-center w-9 h-9 p-2 border border-gray-200 rounded-xl cursor-pointer"
                role="button"
                tabIndex={0}
              >
                {expanded[id] ? (
                  <ChevronUp className="text-cerulean-500 hover:text-cerulean-1000 transition-transform duration-500" />
                ) : (
                  <ChevronDown className="text-cerulean-500 hover:text-cerulean-1000 transition-transform duration-500" />
                )}
              </div>
              <h3>{type} Documents</h3>
            </div>
            <div
              data-testid={`forms-view-${type}`}
              id="forms-view"
              className={`transition-all duration-500 ease-in-out ${
                expanded[id] ? "visible max-h-fit opacity-100" : "collapse max-h-0 opacity-0"
              }`}
            >
              <div id={"forms-view"} className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 justify-start p-4">
                {forms
                  .filter((form: any) => form.type === type)
                  .map((form: any, index: number) => (
                    <div key={`form-select-${index}`} className="h-full w-full">
                      <FormSelect
                        data-testid={`form-select-${index}`}
                        form={form}
                        onCreateDocumentClick={() => onCreateDocumentClick(form.type, form.name)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {formTypes.length > id + 1 && <hr className="m-4" />}
        </React.Fragment>
      ))}
    </div>
  );
};
