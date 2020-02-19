import React, { ReactElement, ReactNode } from "react";
import { issueDocument } from "@govtechsg/tradetrust-schema";
import { WrappedDocument } from "@govtechsg/open-attestation";
import { Document } from "@govtechsg/decentralized-renderer-react-components";

interface FormDataState {
  documentsList: Array<Document>;
  setDocumentsList: (documentsList: Document[]) => void;
  wrappedDocument: WrappedDocument<any> | null;
  setDocument: (document: Document) => void;
}

export const FormDataContext = React.createContext<FormDataState>({
  documentsList: [],
  setDocumentsList: (documentsList: Document[]) => documentsList,
  wrappedDocument: null,
  setDocument: (document: Document) => document
});

interface FormDataProps {
  children: ReactNode;
}

export class FormDataProvider extends React.Component<FormDataProps, FormDataState> {
  constructor(props: FormDataProps) {
    super(props);
    this.state = {
      documentsList: [],
      wrappedDocument: null,
      setDocumentsList: (documentsList: Document[]) => {
        this.setState(prevState => {
          return { ...prevState, documentsList };
        });
      },
      setDocument: (document: Document) => {
        const wrappedDocument = issueDocument(document);
        this.setState(prevState => {
          return { ...prevState, wrappedDocument };
        });
      }
    };
  }

  render(): ReactElement {
    return <FormDataContext.Provider value={this.state}>{this.props.children}</FormDataContext.Provider>;
  }
}
