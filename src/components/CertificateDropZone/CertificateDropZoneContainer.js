import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCertificateByActionError,
  getVerifyingCertificateFailure,
  getVerificationStatus,
  getVerifying,
  processQrCode,
  resetCertificateState,
  updateCertificate,
} from "../../reducers/certificate";
import QrReader from "../QrReader";
import { CertificateDropZone } from "./CertificateDropZone";
import { ViewerButton } from "./Views/SharedViewerStyledComponents";

const DisabledButton = styled(ViewerButton)`
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 999;
  margin: 0;
  transform: translateX(-50%);
`;

export class CertificateDropZoneContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileError: false,
      qrReaderVisible: false,
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
    this.toggleQrReaderVisible = this.toggleQrReaderVisible.bind(this);
    this.handleQrScanned = this.handleQrScanned.bind(this);
  }

  handleQrScanned(data) {
    this.props.processQr(data);
    this.setState({ qrReaderVisible: false });
  }

  handleCertificateChange(certificate) {
    this.setState({ fileError: false });
    this.props.updateCertificate(certificate);
  }

  handleFileError() {
    this.setState({ fileError: true });
  }

  toggleQrReaderVisible() {
    this.setState({ qrReaderVisible: !this.state.qrReaderVisible });
  }

  resetData() {
    this.props.resetData();
  }

  render() {
    return this.state.qrReaderVisible ? (
      <div className="relative">
        <QrReader handleQrScanned={this.handleQrScanned} />
        <DisabledButton onClick={this.toggleQrReaderVisible}>Disable</DisabledButton>
      </div>
    ) : (
      <CertificateDropZone
        fileError={this.state.fileError}
        handleCertificateChange={this.handleCertificateChange}
        handleFileError={this.handleFileError}
        verifying={this.props.verifying}
        verificationStatus={this.props.verificationStatus}
        resetData={this.resetData.bind(this)}
        toggleQrReaderVisible={this.toggleQrReaderVisible}
        retrieveCertificateByActionError={this.props.retrieveCertificateByActionError}
        verificationError={this.props.verificationError}
      />
    );
  }
}

const mapStateToProps = (store) => ({
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store),
  retrieveCertificateByActionError: getCertificateByActionError(store),
  verificationError: getVerifyingCertificateFailure(store),
});

const mapDispatchToProps = (dispatch) => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: (payload) => dispatch(updateCertificate(payload)),
  resetData: () => dispatch(resetCertificateState()),
  processQr: (payload) => dispatch(processQrCode(payload)),
});

const ConnectedCertificateDropZoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateDropZoneContainer);

export default ConnectedCertificateDropZoneContainer;

CertificateDropZoneContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  processQr: PropTypes.func,
  verificationStatus: PropTypes.array,
  retrieveCertificateByActionError: PropTypes.string,
};
