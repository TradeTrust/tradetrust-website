import PropTypes from "prop-types";
import Link from "next/link";
import { get } from "lodash";
import { TYPES, MESSAGES } from "../../../constants/VerificationErrorMessages";
import css from "./viewerStyles.scss";

const DetailedErrors = ({ verificationStatus }) => {
  const errors = [];
  if (!get(verificationStatus, "hash.checksumMatch")) errors.push(TYPES.HASH);
  if (!get(verificationStatus, "issued.issuedOnAll")) errors.push(TYPES.ISSUED);
  if (get(verificationStatus, "revoked.revokedOnAny", true))
    errors.push(TYPES.REVOKED);
  if (!get(verificationStatus, "identity.identifiedOnAll"))
    errors.push(TYPES.IDENTITY);
  const renderedError = errors.map((errorType, index) => (
    <div id={`error-tab${index}`} key={index}>
      <p className={css.messages}>{MESSAGES[errorType].failureTitle}</p>
      <p>{MESSAGES[errorType].failureMessage}</p>
    </div>
  ));
  return <div className={css.verifications}>{renderedError}</div>;
};

DetailedErrors.propTypes = {
  verificationStatus: PropTypes.object
};

const View = ({ resetData, verificationStatus }) => (
  <div
    className={`${css["viewer-container"]} ${css.invalid}`}
    style={{
      backgroundColor: "#fbeae9",
      borderRadius: 10
    }}
  >
    <span className={css["message-container"]}>
      <img src="/static/images/dropzone/invalid.svg" />
      <span className="invalid m-3" style={{ fontSize: "1.5rem" }}>
        This certificate is not valid
      </span>
    </span>

    <DetailedErrors verificationStatus={verificationStatus} />

    <Link href="/faq">
      <div className={css["unverified-btn"]}>What should I do?</div>
    </Link>

    <div className={css["secondary-links"]}>
      <span>
        <Link href=" ">
          <a
            onClick={e => {
              e.preventDefault();
              resetData();
            }}
            className={css["text-link"]}
          >
            Try another
          </a>
        </Link>
      </span>
    </div>
  </div>
);

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  verificationStatus: PropTypes.object
};

export default View;
