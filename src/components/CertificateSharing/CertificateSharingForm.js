import PropTypes from "prop-types";
import React, { Component } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_CLIENT_KEY } from "../../config";
import { states } from "../../reducers/certificate";
import { Button } from "@govtechsg/tradetrust-ui-components";

export class CertificateSharingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captcha: "",
      email: "",
    };

    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleCaptchaChange(value) {
    this.setState({ captcha: value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSend() {
    const { handleSendCertificate, emailSendingState } = this.props;
    if (emailSendingState !== states.PENDING) {
      handleSendCertificate({
        email: this.state.email,
        captcha: this.state.captcha,
      });
    }
  }

  render() {
    const { emailSendingState } = this.props;
    return (
      <div className="container">
        <div className="max-w-3xl mx-auto flex items-center flex-col">
          <h3>Send your document</h3>
          <p className="w-full mt-2">This sends an email with your .tt attached, and instructions on how to view it.</p>
          <input
            className="w-full border border-solid border-grey my-4 p-1 placeholder-grey-dark"
            value={this.state.emailAddress}
            onChange={this.handleEmailChange}
            placeholder="Enter recipient's email"
          />
          <div className="flex justify-center m-4">
            <ReCAPTCHA sitekey={CAPTCHA_CLIENT_KEY} onChange={this.handleCaptchaChange} />
          </div>
          {emailSendingState === states.SUCCESS ? (
            <div className="flex justify-center my-6">Email successfully sent!</div>
          ) : (
            ""
          )}
          {emailSendingState === states.FAILURE ? (
            <div className="flex justify-center my-6">An error occured, please check your email and captcha</div>
          ) : (
            ""
          )}
          <div className="flex justify-center mx-4 mb-4">
            <Button onClick={this.handleSend}>
              Send
              {emailSendingState === states.PENDING ? <i className="ml-2 fas fa-spinner fa-pulse" /> : ""}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

CertificateSharingForm.propTypes = {
  emailSendingState: PropTypes.string,
  handleSendCertificate: PropTypes.func,
  handleSharingToggle: PropTypes.func,
};
