import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getVerificationStatus,
  getVerifying,
  processQrCode,
  resetCertificateState,
  updateCertificate
} from "../../reducers/certificate";
import { updateNetworkId } from "../../reducers/application";
import CertificateDropZone from "./CertificateDropZone";
import css from "./Views/viewerStyles.scss";
import { QrReaderZone } from "../QrReader";

interface CertificateDropZoneContainerProps {
  updateNetworkId: () => void;
  updateCertificate: (certificate: any) => void; // TODO type me
  resetData: () => void;
  verifying?: boolean;
  processQr: (data: any) => void; // TODO type me
  verificationStatus: any; // TODO type me
}

interface CertificateDropZoneContainerState {
  fileError: boolean;
  qrReaderVisible: boolean;
}

export class CertificateDropZoneContainer extends Component<
  CertificateDropZoneContainerProps,
  CertificateDropZoneContainerState
> {
  constructor(props: CertificateDropZoneContainerProps) {
    super(props);

    this.state = {
      fileError: false,
      qrReaderVisible: false
    };
    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleFileError = this.handleFileError.bind(this);
    this.toggleQrReaderVisible = this.toggleQrReaderVisible.bind(this);
    this.handleQrScanned = this.handleQrScanned.bind(this);
  }

  componentDidMount() {
    this.props.updateNetworkId();
  }

  handleQrScanned(data: any) {
    this.props.processQr(data);
    this.setState({ qrReaderVisible: false });
  }

  handleCertificateChange(certificate: any) {
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
        <QrReaderZone handleQrScanned={this.handleQrScanned} />
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
      />
    );
  }
}

// TODO type me redux
const mapStateToProps = (store: any) => ({
  verifying: getVerifying(store),
  verificationStatus: getVerificationStatus(store)
});

// TODO type me redux
const mapDispatchToProps = (dispatch: any) => ({
  updateNetworkId: () => dispatch(updateNetworkId()),
  updateCertificate: (payload: any) => dispatch(updateCertificate(payload)),
  resetData: () => dispatch(resetCertificateState()),
  processQr: (payload: any) => dispatch(processQrCode(payload))
});

export const ConnectedCertificateDropZoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CertificateDropZoneContainer);
