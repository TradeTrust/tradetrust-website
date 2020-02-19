import React, { ReactElement } from "react";
import Dropzone from "react-dropzone";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const DropzoneDiv = styled.div`
  height: 100%;
  text-align: center;
  background-color: #f5f8fb;
  border: 2px dashed #0099cc;
  box-shadow: 0 0 0px 10px #f5f8fb;
  text-align: center !important;
  padding: 1.5rem;
  height: 100%;
  justify-content: center !important;
  flex-direction: column !important;
  display: flex !important;
`;

const SelectButton = styled.button`
  border: 1px solid #0099cc;
  color: #0099cc;
  background-color: #0099cc;
  padding: 7px 23px;
  border-radius: 7px;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  min-width: 135px;
  cursor: pointer;
  background-color: #fff;
  margin: 0 auto;
`;

export const DropzoneView = ({ onFileDrop }: { onFileDrop: (acceptedFiles: File[]) => void }): ReactElement => (
  <Dropzone onDrop={onFileDrop}>
    {({ getRootProps, getInputProps }) => (
      <section id="document-dropzone" className="h-100">
        <DropzoneDiv
          {...getRootProps({
            className: "p-3"
          })}
        >
          <input {...getInputProps()} />
          <p
            css={css`
              font-size: 1.375rem;
              font-weight: 500;
            `}
          >
            Drag &apos;n&apos; drop TradeTrust configuration file here{" "}
          </p>
          <div className="text-muted row">
            <div className="col-2" />
            <div className="col-3">
              <hr />
            </div>{" "}
            <div className="col-2">or</div>{" "}
            <div className="col-3">
              <hr />
            </div>{" "}
            <div className="col-2" />
          </div>
          <div className="text-muted-row mt-3">
            <SelectButton type="button">Select File</SelectButton>
          </div>
        </DropzoneDiv>
      </section>
    )}
  </Dropzone>
);
