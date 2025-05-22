import React, { FunctionComponent } from "react";
import ConnectToMetamask from "../../ConnectToMetamask";
import { ProgressPanel } from "./ProgressPanel";
import { FormPreviewComponent } from "./FormPreviewComponent";
import { AssetInformationPanel } from "./AssetInformationPanel";
import { Page } from "../../Layout/Page";
import { Card } from "../../UI/Card";
// import { DocumentBuilder } from "@trustvc/trustvc";
// import { flattenData, getDataW3C } from "../../../common/utils/dataHelpers";
import { useFormsContext } from "../../../common/contexts/FormsContext";
import { Redirect } from "react-router-dom";

const document: any = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/security/bbs/v1",
    "https://w3id.org/vc/status-list/2021/v1",
    "https://trustvc.io/context/transferable-records-context.json",
    "https://trustvc.io/context/render-method-context.json",
    "https://trustvc.io/context/attachments-context.json",
    "https://schemata.openattestation.com/io/tradetrust/bill-of-lading/1.0/bill-of-lading-context.json",
  ],
  renderMethod: [
    {
      id: "https://generic-templates.tradetrust.io",
      type: "EMBEDDED_RENDERER",
      templateName: "BILL_OF_LADING",
    },
  ],
  credentialSubject: {
    shipper: {
      address: {},
    },
    consignee: {},
    notifyParty: {},
    blNumber: "20250107",
    scac: "20250107",
  },
  issuanceDate: "2021-12-03T12:19:52Z",
  expirationDate: "2029-12-03T12:19:52Z",
  issuer: "did:web:trustvc.github.io:did:1",
  type: ["VerifiableCredential"],
};

export const FormPreviewLanding: FunctionComponent = () => {
  const { form, currentFormTemplate } = useFormsContext();
  if (!form || !currentFormTemplate) return <Redirect to="/creator" />;

  // const mergedCredentialSubject = {
  //   ...currentFormTemplate.defaults.credentialSubject,
  //   ...getDataW3C(form.data.formData),
  // };

  // const builder = new DocumentBuilder(currentFormTemplate.defaults)
  //   .credentialSubject(flattenData(mergedCredentialSubject))
  //   .renderMethod(currentFormTemplate.defaults.renderMethod);

  // document = builder.toString();

  return (
    <Page title="Create Document">
      {currentFormTemplate.type === "TRANSFERABLE_RECORD" && (
        <Card>
          <div className="flex flex-col flex-start md:flex-row md:justify-between md:items-center">
            <div>
              <h6 className="my-4">Selected Network :</h6>
              <p>Mainnet Network</p>
            </div>
            <div className="my-4">
              <ConnectToMetamask />
            </div>
          </div>
        </Card>
      )}
      <Card>
        <ProgressPanel />
      </Card>
      <Card>
        <AssetInformationPanel />
      </Card>
      <Card>
        <FormPreviewComponent document={document} />
      </Card>
    </Page>
  );
};
