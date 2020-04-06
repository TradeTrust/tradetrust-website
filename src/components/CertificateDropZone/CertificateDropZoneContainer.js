import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  updateCertificate,
  getVerifying,
  getVerificationStatus,
  resetCertificateState,
  processQrCode,
  getCertificateByActionError,
} from "../../reducers/certificate";
import { updateNetworkId } from "../../reducers/application";
import CertificateDropZone from "./CertificateDropZone";
import css from "./Views/viewerStyles.module.scss";
import QrReader from "../QrReader";

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

  componentDidMount() {
    this.props.updateNetworkId();
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
      <>
        <QrReader handleQrScanned={this.handleQrScanned} />
        <button
          type="button"
          onClick={this.toggleQrReaderVisible}
          className={`pointer ${css.btn} ${css["disable-btn"]}`}
        >
          Disable
        </button>
      </>
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
      />
    );
  }
}

const mapStateToProps = (store) => ({
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store),
  retrieveCertificateByActionError: getCertificateByActionError(store),
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
