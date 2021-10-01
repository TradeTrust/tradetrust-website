import { wrapDocument } from "@govtechsg/open-attestation";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useProviderContext } from "../../../../common/contexts/provider";
import { useDemoFormContext } from "../DemoFormContext";
import { DocumentStoreFactory } from "@govtechsg/document-store";
import { Signer, ContractTransaction, ContractReceipt } from "ethers";
import { saveAs } from "file-saver";
import { Button, LoaderSpinner, ProgressBar } from "@govtechsg/tradetrust-ui-components";
import { WrappedDocument } from "@govtechsg/open-attestation/dist/types/3.0/types";
import { CheckCircle, XCircle } from "react-feather";
import { Link } from "react-router-dom";
import axios from "axios";

type IssueState = "pending" | "success" | "failure";

const sandboxEndpoint = "https://sandbox.fyntech.io";

export const DemoCreateIssue: FunctionComponent = () => {
  const { formValues } = useDemoFormContext();
  const { provider: signer } = useProviderContext();
  const [issueState, setIssueState] = useState("pending" as IssueState);
  const [savedWrappedDocument, setSavedWrappedDocument] = useState();

  useEffect(() => {
    const deployDocumentStore = async () => {
      const factory = new DocumentStoreFactory(signer as Signer);
      const documentStore = await factory.deploy(`Demo Store`);
      documentStore.deployTransaction.wait();
      return {
        nonce: documentStore.deployTransaction.nonce + 1,
        documentStoreAddress: documentStore.address,
      };
    };

    const publishDocument = async (
      documentStoreAddress: string,
      wrappedDocument: WrappedDocument<any>,
      nonce: number
    ) => {
      const {
        signature: { targetHash },
      } = wrappedDocument;
      const documentStore = DocumentStoreFactory.connect(documentStoreAddress, signer);
      const contractTransaction: ContractTransaction = await documentStore.issue(`0x${targetHash}`, {
        nonce,
      });
      const contractReceipt: ContractReceipt = await contractTransaction.wait();

      if (!contractReceipt.transactionHash)
        throw new Error(`contractReceipt hash not available: ${JSON.stringify(contractReceipt)}`);
    };

    const getWrappedDocument = async (
      documentStoreAddress: string,
      identityLocation: string
    ): Promise<WrappedDocument<any>> => {
      const issuers = [
        {
          name: "Demo Issuer",
          documentStore: documentStoreAddress,
          identityProof: {
            type: "DNS-TXT",
            location: identityLocation,
          },
        },
      ];

      const wrappedDocument = await wrapDocument({
        $template: {
          type: "EMBEDDED_RENDERER",
          name: "SIMPLE_COO",
          url: "https://generic-templates.tradetrust.io",
        },
        issuers,
        ...formValues,
      });

      return wrappedDocument;
    };

    const createTempDns = async (documentStoreAddress: string) => {
      const { data } = await axios({
        method: "POST",
        url: sandboxEndpoint,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          address: documentStoreAddress,
          networkId: 3,
        },
      });

      const { executionId } = data;

      let identityLocation;

      /**
       * dns-sandbox only allows requests from dev.tradetrust.io,
       * so we just mock the identity location when testing from localhost
       */
      if (process.env.NODE_ENV === "development") {
        // wont work for verification
        identityLocation = "random-blue-cat";
      } else {
        const {
          data: { name },
        } = await axios({
          method: "GET",
          url: `${sandboxEndpoint}/execution/${executionId}`,
        });

        identityLocation = name;
      }

      return identityLocation;
    };

    const run = async () => {
      try {
        const { documentStoreAddress, nonce } = await deployDocumentStore();
        const identityLocation = await createTempDns(documentStoreAddress);
        const wrappedDocument = await getWrappedDocument(documentStoreAddress, identityLocation);
        setSavedWrappedDocument(wrappedDocument);
        await publishDocument(documentStoreAddress, wrappedDocument, nonce);
        downloadDocument(wrappedDocument);
        setIssueState("success");
      } catch (e) {
        console.error(e);
        setIssueState("failure");
      }
    };

    run();
  }, [formValues, signer]);

  const downloadDocument = (wrappedDocument: WrappedDocument<any>) => {
    const file = JSON.stringify(wrappedDocument);
    const blob = new Blob([file], { type: "text/json;charset=utf-8" });
    const documentName = "demo.tt";
    saveAs(blob, documentName);
  };

  return (
    <>
      <ProgressBar totalSteps={3} step={3} />
      <div className="h-72 flex items-center justify-center">
        <div className="text-center">
          {issueState === "pending" && (
            <>
              <LoaderSpinner width="36px" className="mx-auto mb-4" primary="#3B8CC5" />
              <h3>Issuing Document</h3>
            </>
          )}
          {issueState === "success" && (
            <>
              <CheckCircle width="48px" height="48px" className="text-emerald w-full mb-4" />
              <h3>Success!</h3>
              <p className="py-5">
                Your file will be downloaded automatically, if it
                <br />
                doesn’t automatically download, click{" "}
                <a className="cursor-pointer" onClick={() => downloadDocument(savedWrappedDocument)}>
                  here
                </a>
                .
              </p>
              <Button className="bg-cerulean text-white rounded hover:bg-cerulean-500">Test Your File Now</Button>
            </>
          )}
          {issueState === "failure" && (
            <>
              <XCircle width="48px" height="48px" className="text-rose w-full mb-4" />
              <h3>Failed</h3>
              <p className="py-5">
                Please check if you have internet connection,
                <br /> alternatively, see <Link to="/faq">FAQ</Link> or <Link to="/contact">Contact us</Link>
              </p>
              <Button className="bg-cerulean text-white rounded hover:bg-cerulean-500">
                <Link className="text-white hover:text-white" to="/demo/create">
                  Try Again
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};
