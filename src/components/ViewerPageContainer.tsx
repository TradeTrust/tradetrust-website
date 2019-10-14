import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "@govtechsg/open-attestation";

import { withRouter, RouteComponentProps } from "react-router";
import {
  getCertificate,
  getEmailSendingState,
  getVerificationStatus,
  getVerifying,
  sendCertificate,
  sendCertificateReset,
  updateCertificate,
  updateObfuscatedCertificate
} from "../reducers/certificate";
import { CertificateViewerContainer } from "./CertificateViewer";

type ViewerPageProps = RouteComponentProps & {
  updateCertificate: (certificate: any) => void;
  document: any;
  certificate: any;
  verifying: boolean;
  verificationStatus: any;
  emailSendingState: any;
  sendCertificate: (params: { email: string; captcha: string }) => void;
  sendCertificateReset: () => void;
  updateObfuscatedCertificate: (updatedDoc: any) => void;
  history: History;
};
interface ViewerPageState {
  showSharing: boolean;
  detailedVerifyVisible: boolean;
}

export class ViewerPage extends Component<ViewerPageProps, ViewerPageState> {
  constructor(props: ViewerPageProps) {
    super(props);

    this.state = {
      showSharing: false,
      detailedVerifyVisible: false
    };
    this.handleSharingToggle = this.handleSharingToggle.bind(this);
    this.handleSendCertificate = this.handleSendCertificate.bind(this);
  }

  componentDidMount() {
    const { document, history } = this.props;
    if (!document) {
      history.push("/");
    }
  }

  handleSharingToggle() {
    this.props.sendCertificateReset();
    this.setState({ showSharing: !this.state.showSharing });
  }

  handleSendCertificate({ email, captcha }: { email: string; captcha: string }) {
    this.props.sendCertificate({ email, captcha });
  }

  render() {
    if (!this.props.document) return null;
    return (
      <CertificateViewerContainer
        document={this.props.document}
        certificate={getData(this.props.document)}
        verifying={this.props.verifying}
        verificationStatus={this.props.verificationStatus}
        showSharing={this.state.showSharing}
        handleSendCertificate={this.handleSendCertificate}
        handleSharingToggle={this.handleSharingToggle}
        emailSendingState={this.props.emailSendingState}
        detailedVerifyVisible={this.state.detailedVerifyVisible}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  document: getCertificate(store),

  // Verification statuses used in verifier block
  emailSendingState: getEmailSendingState(store),
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store)
});

const mapDispatchToProps = (dispatch: any) => ({
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload)),
  sendCertificate: (payload: any) => dispatch(sendCertificate(payload)),
  sendCertificateReset: () => dispatch(sendCertificateReset()),
  updateObfuscatedCertificate: (updatedDoc: any) => dispatch(updateObfuscatedCertificate(updatedDoc))
});

export const ViewerPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewerPage));
