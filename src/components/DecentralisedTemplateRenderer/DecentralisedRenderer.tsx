import React, { Component } from "react";
import { connect } from "react-redux";
import connectToChild from "penpal/lib/connectToChild";
import { getData, obfuscateDocument } from "@govtechsg/open-attestation";
import { getActiveTemplateTab, getCertificate } from "../../reducers/certificate.selectors";
import {
  registerTemplates as registerTemplatesAction,
  selectTemplateTab as selectTemplateTabAction,
  updateObfuscatedCertificate
} from "../../reducers/certificate";

interface DecentralisedRendererProps {
  document: any;
  certificate: any;
  source: string;
  activeTab: number;
  registerTemplates: (templates: any) => void;
  selectTemplateTab: (index: number) => void;
  updateObfuscatedCertificate: (document: any) => void;
}

interface DecentralisedRendererState {
  childFrameConnection: any;
}

class DecentralisedRenderer extends Component<DecentralisedRendererProps, DecentralisedRendererState> {
  iframe: any;
  constructor(props: DecentralisedRendererProps) {
    super(props);
    this.state = {
      childFrameConnection: null
    };
  }

  async selectTemplateTab(i: number) {
    const { childFrameConnection } = this.state;
    const child = await childFrameConnection;
    await child.selectTemplateTab(i);
    this.props.selectTemplateTab(i);
  }

  updateHeight(h: any) {
    this.iframe.height = h;
  }

  updateTemplates(templates: any) {
    if (!templates) return;
    this.props.registerTemplates(templates);
  }

  handleObfuscation(field: string) {
    const updatedDocument = obfuscateDocument(this.props.document, field);
    this.props.updateObfuscatedCertificate(updatedDocument);
    const updatedCertificate = getData(updatedDocument);
    this.renderDocument(updatedCertificate);
  }

  async renderDocument(certificate: any) {
    const { childFrameConnection } = this.state;
    const child = await childFrameConnection;
    await child.renderDocument(certificate);
  }

  // Do not re-render component if only activeTab changes
  shouldComponentUpdate(nextProps: DecentralisedRendererProps) {
    if (this.props.activeTab !== nextProps.activeTab && this.props.document === nextProps.document) {
      this.selectTemplateTab(nextProps.activeTab);
      return false;
    }
    return true;
  }

  componentDidMount() {
    const iframe = this.iframe;
    const updateHeight = this.updateHeight.bind(this);
    const updateTemplates = this.updateTemplates.bind(this);
    const handleObfuscation = this.handleObfuscation.bind(this);
    const childFrameConnection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates,
        handleObfuscation
      }
    }).promise;
    this.setState({ childFrameConnection });

    childFrameConnection.then((frame: any) => frame.renderDocument(getData(this.props.certificate)));
  }

  render() {
    return (
      <iframe
        title="Decentralised Rendered Certificate"
        id="iframe"
        ref={iframe => {
          this.iframe = iframe;
        }}
        src={this.props.source}
        style={{ width: "100%", border: 0 }}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  document: getCertificate(store),
  activeTab: getActiveTemplateTab(store)
});

const mapDispatchToProps = (dispatch: any) => ({
  updateObfuscatedCertificate: (updatedDoc: any) => dispatch(updateObfuscatedCertificate(updatedDoc)),
  registerTemplates: (templates: any) => dispatch(registerTemplatesAction(templates)),
  selectTemplateTab: (tabIndex: any) => dispatch(selectTemplateTabAction(tabIndex))
});

export const DecentralisedRendererContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecentralisedRenderer);
