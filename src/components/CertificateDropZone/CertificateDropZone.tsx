import { errorMessages, isDocumentRevokable, isTransferableRecord, isValid } from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { useProviderContext } from "../../common/contexts/provider";
import { getDropzoneBoxUi } from "../../common/utils/getDropzoneBoxUi";
import { ChainId } from "../../constants/chain-info";
import { RootState } from "../../reducers";
import {
  resetCertificateState,
  states,
  updateCertificate,
  updateFilename,
  verifyingCertificateCompleted,
  verifyingCertificateFailure,
} from "../../reducers/certificate";
import { getChainId } from "../../utils/shared";
import { View, ViewActionError, ViewVerificationError, ViewVerificationPending } from "../DocumentDropzone/Views";
import { ViewTokenRegistryMismatch } from "../DocumentDropzone/Views/ViewTokenRegistryMismatch";
import NetworkSectionModel from "../NetworkSection/NetworkSectionModel";
import { HeaderIconState } from "../UI/Overlay/OverlayContent/Model";
import { useNetworkSelect } from "./../../common/hooks/useNetworkSelect";
import { LoadDemoCertificate } from "./LoadDemoCertificate";

const { TYPES } = errorMessages;

interface CertificateDropzoneProps {
  toggleQrReaderVisible?: () => void;
}

export const CertificateDropZone: FunctionComponent<CertificateDropzoneProps> = (props) => {
  const { toggleQrReaderVisible } = props;
  const dispatch = useDispatch();
  const {
    verificationPending,
    retrieveCertificateByActionState,
    verificationStatus,
    verificationError,
    tokenRegistryV4,
  } = useSelector((state: RootState) => {
    return state.certificate;
  });
  const { showOverlay, closeOverlay } = useContext(OverlayContext);

  const isVerificationPending = verificationPending;
  const isTokenRegistryV4 = tokenRegistryV4;
  const isVerificationError = useMemo(() => {
    if (verificationError) return true;
    if (verificationStatus && !isValid(verificationStatus)) return true;
    return false;
  }, [verificationError, verificationStatus]);
  const isActionError = retrieveCertificateByActionState === states.FAILURE;

  const resetData = useCallback(() => {
    dispatch(resetCertificateState());
  }, [dispatch]);

  const { currentChainId } = useProviderContext();
  const { switchNetwork } = useNetworkSelect();

  const processFile = useCallback(
    async (json: any, chainId?: ChainId) => {
      if (!chainId) {
        dispatch(updateCertificate(json));
        return;
      }

      if (currentChainId === chainId) {
        dispatch(updateCertificate(json));
      } else {
        await switchNetwork(chainId);
        setTargetChainId(chainId);
        setPendingCertificateData(json);
      }

      closeOverlay();
    },
    [dispatch, currentChainId, switchNetwork, closeOverlay]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        if (file?.name) {
          dispatch(updateFilename(file.name));
        }

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = async () => {
          try {
            const json = JSON.parse(reader.result as string);
            const chainId = getChainId(json);
            const requiresNetwork = isTransferableRecord(json) || isDocumentRevokable(json);

            if (!chainId && requiresNetwork) {
              showOverlay(
                <NetworkSectionModel
                  collapsible={false}
                  title="TradeTrust Document Uploaded"
                  headerIconState={HeaderIconState.SUCCESS}
                  cancelText="Cancel"
                  continueText="Proceed"
                  preContent={
                    <div className="flex justify-center items-center">
                      <p>Select network for transferable document verification.</p>
                    </div>
                  }
                  postContent={<></>}
                  nextStep={() => {
                    processFile(json, chainId);
                  }}
                />
              );
              return;
            }

            await processFile(json, chainId);
          } catch (e) {
            if (e instanceof Error) {
              const { message } = e;
              const isNetworkMismatch =
                message === TYPES.NETWORK_MISMATCH_MAINNET || message === TYPES.NETWORK_MISMATCH_TESTNET;
              const errorType = isNetworkMismatch ? (message as keyof typeof TYPES) : TYPES.INVALID;
              dispatch(verifyingCertificateFailure(errorType));
              dispatch(verifyingCertificateCompleted({}));
            }
          }
        };
        reader.readAsText(file);
      });
    },
    [dispatch, processFile, showOverlay]
  );

  const [targetChainId, setTargetChainId] = useState<number | null>(null);
  const [pendingCertificateData, setPendingCertificateData] = useState<any | null>(null);

  // Effect to dispatch once currentChainId matches targetChainId
  useEffect(() => {
    if (targetChainId && currentChainId === targetChainId && pendingCertificateData) {
      dispatch(updateCertificate(pendingCertificateData));
      setTargetChainId(null);
      setPendingCertificateData(null);
    }
  }, [currentChainId, targetChainId, pendingCertificateData, dispatch]);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    // accept: "application/json", // TODO: https://react-dropzone.js.org/#!/Accepting%20specific%20file%20types
  });

  const customStyle = useMemo(() => {
    return getDropzoneBoxUi({
      isDragReject,
      isDragActive,
      isDragAccept,
      isVerificationPending,
      isVerificationError,
      isActionError,
      isTokenRegistryV4,
    });
  }, [
    isDragReject,
    isDragActive,
    isDragAccept,
    isVerificationPending,
    isVerificationError,
    isActionError,
    isTokenRegistryV4,
  ]);

  return (
    <div
      className={`border-y-2 xs:border-2 rounded-none xs:rounded-xl text-center relative p-8 min-h-[400px] flex flex-col justify-center ${customStyle} -mx-4 xs:mx-0`}
    >
      <div data-testid="certificate-dropzone" className="cursor-pointer" {...getRootProps()}>
        <input {...getInputProps()} />
        {(() => {
          switch (true) {
            case isVerificationPending:
              return <ViewVerificationPending />;
            case isTokenRegistryV4:
              return <ViewTokenRegistryMismatch resetData={resetData} />;
            case isVerificationError:
              return <ViewVerificationError resetData={resetData} />;
            case isActionError:
              return <ViewActionError resetData={resetData} />;
            default:
              return <View toggleQrReaderVisible={toggleQrReaderVisible} />;
          }
        })()}
      </div>
      <div className="my-4 w-full border border-cloud-100" />
      <LoadDemoCertificate currentChainId={currentChainId} />
    </div>
  );
};
