import { FunctionComponent, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import React from "react";
import { useConfigContext } from "../common/contexts/ConfigContext";
import { useFormsContext } from "../common/contexts/FormsContext";
import { ProcessDocumentScreen } from "../components/ProcessDocumentScreen";
import { Page } from "../components/Layout/Page";
import { BackModal } from "../components/ProcessDocumentScreen/BackModal";
import { generateFileName } from "../utils";
import { saveAs } from "file-saver";
import { useCreatorContext } from "../common/contexts/CreatorContext";

export const PublishFormPage: FunctionComponent = () => {
  const { config, setConfig } = useConfigContext();
  const { form, setForm, currentFormTemplate } = useFormsContext();
  const [showBackModal, setShowBackModal] = useState(false);
  const history = useHistory();
  const [processedDocument, setProcessedDocument] = useState<any>();
  const { haveDownloadedAllDocument } = useCreatorContext();

  if (!config || !form || !currentFormTemplate) return <Redirect to="/creator" />;

  const onCreateAnotherDocument = (): void => {
    if (!haveDownloadedAllDocument) {
      setShowBackModal(true);
    } else {
      onBackToFormSelection();
    }
  };

  const downloadModal = (): void => {
    if (processedDocument) {
      const blob = new Blob([JSON.stringify(processedDocument)], { type: "application/json;charset=utf-8" });
      const documentName = generateFileName({
        fileName: form.fileName,
        extension: form.extension,
      });
      saveAs(blob, documentName);
    }

    setShowBackModal(false);
  };

  const onBackToFormSelection = (): void => {
    setForm(undefined);
    setConfig(undefined);
    history.push("/creator");
  };

  return (
    <Page title="Create Document">
      <ProcessDocumentScreen
        form={form}
        processAnotherDocument={onCreateAnotherDocument}
        formTemplate={currentFormTemplate}
        onDocumentReady={setProcessedDocument}
      />
      <BackModal show={showBackModal} backToFormSelection={onBackToFormSelection} downloadModal={downloadModal} />
    </Page>
  );
};
