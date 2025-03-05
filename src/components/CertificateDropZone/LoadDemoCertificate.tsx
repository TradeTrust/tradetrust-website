import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { updateCertificate } from "../../reducers/certificate";
import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import { loadDemoCertificate } from "../VerifyPageContent/helpers";
import { reset, setActive } from "../../reducers/sample";
import { URLS } from "../../constants";
import { ChainId } from "../../constants/chain-info";
interface LoadDemoCertificateProps {
  currentChainId: ChainId | undefined;
}
export const LoadDemoCertificate: FunctionComponent<LoadDemoCertificateProps> = ({ currentChainId }) => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);

  return (
    <div className="text-center">
      <div>
        <h4>No TradeTrust Document?</h4>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button
          className="bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200"
          onClick={() => {
            if (currentChainId) {
              loadDemoCertificate(loadCertificate, currentChainId);
              dispatch(setActive());
            } else {
              dispatch(reset());
            }
          }}
        >
          Load Demo Tradetrust Document
        </Button>
        <a href={URLS.CREATOR} target="_blank" rel="noopener noreferrer">
          <Button className="bg-white rounded-xl text-lg py-2 px-3 border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200">
            Create Tradetrust Document
          </Button>
        </a>
      </div>
    </div>
  );
};
