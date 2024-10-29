import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { FunctionComponent } from "react";
import { FormState } from "../../../constants/FormState";

interface RejectOwnerFormProps {
  actionTitle: string;
  handleAction: () => void;
  actionState: string;
  setFormActionNone: () => void;
  closeOverlay: () => void;
  setShowEndorsementChain: (payload: boolean) => void;
  remarkValue: string;
  setRemarkValue: (value: string) => void;
}

export const ActionManagementSkeleton: FunctionComponent<RejectOwnerFormProps> = ({
  actionTitle,
  handleAction,
  actionState,
  closeOverlay,
  //   setFormActionNone,
  //   setShowEndorsementChain,
  remarkValue,
  setRemarkValue,
}) => {
  if (actionState === FormState.PENDING_CONFIRMATION)
    return (
      <div
        className={`font-gilroy bg-white !w-[606px] !Smax-h-[392px] sm:mx-8 xl:mx-16 flex w-full flex-col gap-y-1 rounded-xl bg-white p-6 font-medium leading-5 tracking-[0px] text-neutral-600 z-20 `}
      >
        <div className="flex flex-wrap items-center gap-x-[7px] gap-y-[7px] min-[596px]:flex-nowrap">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center px-[11px] py-[6.5px]">
            <div className="relative z-0 flex flex-col items-center pb-[3px] pl-[3px]">
              <div
                className="absolute bottom-[-6.5px] left-[-12px] right-[-12px] top-[-6.5px] z-0"
                style={{ backgroundImage: "url('/static/images/dropzone/attention.svg')" }}
              />
              <div className="bg-t-bg-line-3ellipse z-[2] flex h-3 flex-shrink-0 flex-col items-center justify-end bg-cover bg-center pr-[0.75px] pt-3">
                {/* <Ellipse className="h-[1.3px] w-[2.3px] flex-shrink-0" /> */}
              </div>
            </div>
          </div>
          <div className="font-ubuntu text-[26px] leading-7" data-testid="waiting-overlay-title">
            {actionTitle} Rejection in Progress
          </div>
        </div>
        <div className="pt-20 pb-4 text-center">
          <span>
            <p className="mb-3 text-center">
              Document is currently being updated. You may track its progress via the endorsement chain.
            </p>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-x-20 gap-y-6 pt-8 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
          <Button
            className="rounded-xl px-[18px] py-3 bg-cerulean-500 text-white hover:bg-cerulean-800"
            onClick={() => closeOverlay()}
            data-testid={"dismissBtn"}
          >
            Dismiss
          </Button>
        </div>
      </div>
    );
  else
    return (
      <>
        <div
          className={`font-gilroy bg-white !w-[606px] !Smax-h-[392px] flex w-full flex-col gap-y-1 rounded-xl bg-white p-6 font-medium leading-5 tracking-[0px] text-neutral-600 z-20`}
        >
          <div className="flex flex-wrap items-center gap-x-[7px] gap-y-[7px] min-[596px]:flex-nowrap">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center px-[11px] py-[6.5px]">
              <div className="relative z-0 flex flex-col items-center pb-[3px] pl-[3px]">
                <div
                  className="absolute bottom-[-6.5px] left-[-12px] right-[-12px] top-[-6.5px] z-0"
                  style={{ backgroundImage: "url('/static/images/dropzone/attention.svg')" }}
                />
              </div>
            </div>
            <div className="font-ubuntu text-[26px] leading-7">Warning - Reject {actionTitle}</div>
          </div>
          <div className="pt-7 text-center">
            <span>
              <p className="mb-3 text-center">
                It seems like you are rejecting the {actionTitle} that is transferred to you. Would you like to provide
                a reason and confirm?
              </p>
            </span>
          </div>
          <div className="flex flex-col justify-end pt-3">
            <div className="flex justify-end rounded-xl border border-solid border-sky-700 pb-[7px] pl-[7px] pr-[7px] pt-[7px] h-20 items-top ">
              <textarea
                value={remarkValue}
                onChange={(e) => setRemarkValue(e.target.value)}
                placeholder="I suspect the transfer may have been a mistake"
                className="text-zinc-800 bg-transparent border-none outline-none w-full h-full resize-none overflow-hidden"
                data-testid="editable-remarks-input"
              />

              <img
                className="h-5 w-5 flex-shrink-0 cursor-pointer"
                onClick={() => setRemarkValue("")}
                src="/static/images/dropzone/x_mark.svg"
              />
            </div>
          </div>
          <div className="flex items-start  gap-x-2 gap-y-2 ">
            <div
              className="h-4 w-4 flex-shrink-0"
              style={{ backgroundImage: "url('/static/images/dropzone/info.svg')" }}
            />
            <h6 className="font-gilroy  w-[500px] flex-shrink-0 font-medium text-[14px] leading-[18px] text-[#636569] text-left">
              Any reason provided will be accessible in the endorsement chain by any verifiers of this document.
            </h6>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-20 gap-y-6 pt-8 text-center text-xl font-bold leading-6 min-[596px]:flex-nowrap">
            <Button
              className=" transition-colors duration-200 ease-out cursor-pointer font-gilroy-bold border rounded-xl bg-white text-cerulean-500 hover:bg-cloud-100 px-[17px] py-[11px]"
              onClick={() => closeOverlay()}
              data-testid={`cancelReject${actionTitle}Btn`}
            >
              Cancel
            </Button>
            <Button
              className="rounded-xl px-[18px] py-3 bg-cerulean-500 text-white hover:bg-cerulean-800"
              onClick={() => handleAction()}
              data-testid={`confirmReject${actionTitle}Btn`}
            >
              Confirm
            </Button>
          </div>
        </div>
      </>
    );
};
