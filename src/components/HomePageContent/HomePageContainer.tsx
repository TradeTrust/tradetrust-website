import React from "react";
import { useLocation } from "react-router-dom";
import { CONSTANTS } from "@tradetrust-tt/tradetrust-utils";
import {
  updateCertificate,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
} from "../../reducers/certificate";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { NestedDocumentState } from "../../constants/NestedDocumentState";
import { getLogger } from "../../utils/logger";
import { useNetworkSelect } from "../../common/hooks/useNetworkSelect";
import { ChainId } from "../../constants/chain-info";
import { ActionType, ActionPayload } from "../../types";

const { error } = getLogger("component:mainpage");
const { TYPES, MESSAGES } = CONSTANTS;

interface Action {
  type: ActionType;
  payload: ActionPayload;
}

export const HomePageContainer = (): React.ReactElement => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { switchNetwork } = useNetworkSelect();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);

  React.useEffect(() => {
    const { search, hash } = location;
    const params = new URLSearchParams(search);
    const query = params.get("q");

    const setProviderNetworkToMatch = async (chainId: ChainId, payload: ActionPayload, anchor: string) => {
      await switchNetwork(chainId);
      dispatch(retrieveCertificateByAction(payload, anchor));
    };

    if (query) {
      const action = JSON.parse(query) as Action;
      const { type, payload } = action;
      const { chainId } = payload;

      const anchorStr = decodeURIComponent(hash.substr(1));
      const anchor = anchorStr ? JSON.parse(anchorStr) : {}; // https://github.com/TradeTrust/tradetrust-website/pull/397

      if (type !== "DOCUMENT") {
        dispatch(retrieveCertificateByActionFailure(`The type ${type} provided from the action is not supported`));
      } else if (chainId === undefined) {
        dispatch(retrieveCertificateByActionFailure(MESSAGES[TYPES.NETWORK_INVALID].failureMessage));
      } else {
        setProviderNetworkToMatch(chainId, payload, anchor);
      }

      history.push("/");
    }
  }, [dispatch, history, location, switchNetwork]);

  // event listener for any custom postMessage
  window.addEventListener("message", (event) => {
    if (event.data.type === NestedDocumentState.LOAD) {
      try {
        const doc = atob(event.data.payload);
        loadCertificate(JSON.parse(doc));
        history.push("/");
      } catch (e) {
        error("decode data not json: " + e);
      }
    }
  });

  return <></>;
};
