import React, { ReactElement, useState } from "react";
import Loader from "react-loader-spinner";
import { PopupModal, FooterModal, SvgIcon } from "../common";
import { DropzoneView } from "./DropzoneView";
import { getLogger } from "../../logger";
import { readFileData } from "../utils/file";
import { notifyError } from "../utils/toast";
import { DATA_FILE_UPLOAD } from "../Constant";
import styled from "@emotion/styled";
import { Constants, Helpers } from "../../styles";

const { trace } = getLogger("components/ConfigDropzone");

const Label = styled.label<{ isError: boolean }>`
  display: flex;
  align-items: center;
  margin-right: 10px;

  input {
    margin-right: 10px;
    padding: 2px 5px;
    border: ${({ isError }) => (isError ? "1px solid red" : "2px inset initial")};

    &::placeholder {
      font-size: 14px;
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const Icon = styled.div`
  transition: opacity 0.3s ${Constants.easeOutCubic};
  cursor: pointer;

  svg {
    width: 15px;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const ErrorMsg = styled.p`
  color: ${Constants.colorDanger};
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const TalignCenter = styled.div`
  ${Helpers.talignCenter}
`;

export const ConfigDropzone = (props: any): ReactElement => {
  const [password, setPassword] = useState("");
  const [isShowPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = (): void => {
    setShowPassword(!isShowPassword);
  };

  const handleConfigUpdate = (configFile: any): void => {
    props.onConfigUpdate(configFile);
  };

  const handleFileError = (e: any): void => {
    notifyError(DATA_FILE_UPLOAD.ERROR + ", " + e.message);
  };

  const handleFileDrop = (acceptedFiles: File[]): void => {
    trace(`Accepted files: ${acceptedFiles}`);
    readFileData(acceptedFiles, handleConfigUpdate, handleFileError);
  };

  const setWallet = (): void => {
    if (!password) notifyError("Please enter valid password");
    else props.setWalletData(password);
    setPassword("");
  };

  return (
    <>
      {props.isPasswordModalVisible && (
        <PopupModal
          title="Enter Password"
          showLoader={props.showLoader}
          toggleDisplay={props.togglePasswordModal}
          footerComponent={
            props.showLoader ? (
              <></>
            ) : (
              <FooterModal toggleConfirmationModal={props.togglePasswordModal} onSubmit={setWallet} />
            )
          }
        >
          <>
            {props.showLoader ? (
              <TalignCenter>
                <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
              </TalignCenter>
            ) : (
              <>
                <Label htmlFor="password" isError={props.passwordError && password.length <= 0}>
                  <input
                    id="password"
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  {isShowPassword ? (
                    <Icon>
                      <SvgIcon className="feather-eye" handler={handlePasswordToggle}>
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      </SvgIcon>
                    </Icon>
                  ) : (
                    <Icon>
                      <SvgIcon className="feather-eye-off" handler={handlePasswordToggle}>
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      </SvgIcon>
                    </Icon>
                  )}
                </Label>
                {props.passwordError && password.length <= 0 && <ErrorMsg>{props.passwordError}</ErrorMsg>}
              </>
            )}
          </>
        </PopupModal>
      )}
      <div className="h-100">
        <div className="row h-25" />
        <div className="row h-50">
          <div id="dropzone-container" className="col">
            <DropzoneView onFileDrop={handleFileDrop} />
          </div>
        </div>
        <div className="row h-25" />
      </div>
    </>
  );
};
