import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { updateCertificate } from "../../reducers/certificate";
import { Button } from "../Button";
import { loadDemoCertificate } from "../VerifyPageContent/helpers";
import { setActive } from "../../reducers/sample";
import { ChainId } from "../../constants/chain-info";
import { Link } from "react-router-dom";
import { getChainInfoFromNetworkName } from "../../common/utils/chain-utils";
import { NETWORK_NAME } from "../../config";
import { useNetworkSelect } from "../../common/hooks/useNetworkSelect";
interface LoadDemoCertificateProps {
  currentChainId: ChainId | undefined;
}
export const LoadDemoCertificate: FunctionComponent<LoadDemoCertificateProps> = ({ currentChainId }) => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  const { switchNetwork } = useNetworkSelect();

  return (
    <div className="text-center">
      <div>
        <h4>No TradeTrust Document?</h4>
      </div>
      <div className="flex flex-col xs:flex-row justify-center gap-2 mt-4">
        <Button
          className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full xs:w-72"
          onClick={async () => {
            const chainIdToUse = currentChainId ?? getChainInfoFromNetworkName(NETWORK_NAME).chainId;
            await loadDemoCertificate(loadCertificate, chainIdToUse, switchNetwork);
            dispatch(setActive());
          }}
        >
          Load Demo Tradetrust Document
        </Button>
        <Link className="w-full xs:w-72" to={"/creator"}>
          <Button className="bg-white rounded-xl border-cloud-100 text-cerulean-500 shadow-none hover:bg-cloud-200 w-full">
            Create Tradetrust Document
          </Button>
        </Link>
      </div>
    </div>
  );
};
