import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { updateCertificate } from "../../reducers/certificate";
import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import { loadDemoCertificate } from "../VerifyPageContent/helpers";
import { reset, setActive } from "../../reducers/sample";
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
      <div className="flex flex-col xs:flex-row justify-center gap-2 mt-4">
        <Button
          className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full xs:w-72"
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
        <a className="w-full xs:w-72" href={"/creator"}>
          <Button className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full">
            Create Tradetrust Document
          </Button>
        </a>
      </div>
    </div>
  );
};
