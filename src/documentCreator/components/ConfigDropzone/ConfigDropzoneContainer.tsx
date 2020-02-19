import React, { useContext, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { FormDataContext } from "../../contexts/FormDataContext";
import { Web3Context } from "../../contexts/Web3Context";
import { getDocumentMetaData, getWalletMeta } from "../utils/config";
import { ConfigDropzone } from "./ConfigDropzoneView";

const ConfigDropzoneContainer = (): ReactElement => {
  const { config, setConfig } = useContext(ConfigContext);
  const { setDocumentsList } = useContext(FormDataContext);
  const { setWallet } = useContext(Web3Context);

  const [isPasswordModalVisible, togglePasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showLoader, toggleLoader] = useState(false);
  const history = useHistory();

  const processConfigUpdate = (configFile: any): void => {
    setConfig(configFile);
    const documentMeta = getDocumentMetaData(configFile);
    setDocumentsList([documentMeta]);
    togglePasswordModal(true);
  };

  const setWalletData = async (password: string): Promise<void> => {
    try {
      toggleLoader(true);
      const wallet = getWalletMeta(config);
      await setWallet(wallet, password);
      togglePasswordModal(false);
      toggleLoader(false);
      history.push("/form");
    } catch (e) {
      toggleLoader(false);
      setPasswordError(e.message);
    }
  };

  return (
    <ConfigDropzone
      config={config}
      onConfigUpdate={processConfigUpdate}
      setWalletData={setWalletData}
      showLoader={showLoader}
      isPasswordModalVisible={isPasswordModalVisible}
      togglePasswordModal={togglePasswordModal}
      passwordError={passwordError}
    />
  );
};

export default ConfigDropzoneContainer;
