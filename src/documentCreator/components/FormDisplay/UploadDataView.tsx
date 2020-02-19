import React, { useContext, ReactElement } from "react";
import { readFileData } from "../utils/file";
import { FormDataContext } from "../../contexts/FormDataContext";
import { ConfigContext } from "../../contexts/ConfigurationContext";
import { notifySuccess, notifyError } from "../utils/toast";
import { DATA_FILE_UPLOAD } from "../Constant";
import { getDocumentMetaData } from "../utils/config";

export const UploadDataView = (): ReactElement => {
  const { setDocumentsList } = useContext(FormDataContext);
  const { config } = useContext(ConfigContext);
  const documentMeta = getDocumentMetaData(config);

  const handleFileError = (e: any): void => {
    notifyError(DATA_FILE_UPLOAD.ERROR + ", " + e.message);
  };

  const updateFormData = (uploadedFormData: Document[]): void => {
    const mergedDocumentsSet = uploadedFormData.map((formData: Document) => ({ ...formData, ...documentMeta }));
    setDocumentsList(mergedDocumentsSet);
    notifySuccess(DATA_FILE_UPLOAD.SUCCESS);
  };

  const handleFileUpload = (e: any): void => {
    readFileData([...e.target.files], updateFormData, handleFileError);
  };

  return (
    <label className="btn btn-primary m-3">
      Upload Data File <input type="file" onChange={e => handleFileUpload(e)} hidden />
    </label>
  );
};
