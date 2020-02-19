import React, { ReactElement } from "react";
import { css } from "@emotion/core";
import { toast, ToastContainer } from "react-toastify";
import { Web3Provider } from "../contexts/Web3Context";
import { ConfigProvider } from "../contexts/ConfigurationContext";
import { FormDataProvider } from "../contexts/FormDataContext";
import { Routes } from "./router";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const DocumentCreator = (): ReactElement => (
  <Web3Provider>
    <ConfigProvider>
      <FormDataProvider>
        <ToastContainer />
        <div
          className="container"
          css={css`
            height: 100vh;
          `}
        >
          <div className="row h-100">
            <div className="col">
              <Routes />
            </div>
          </div>
        </div>
      </FormDataProvider>
    </ConfigProvider>
  </Web3Provider>
);
