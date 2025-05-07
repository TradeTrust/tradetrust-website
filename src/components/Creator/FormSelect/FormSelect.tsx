import React, { FunctionComponent } from "react";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { ExpandPreview } from "./ExpandPreview";

interface FormSelectProps {
  id: string;
  form: any;
  onCreateDocumentClick: () => void;
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({ form, onCreateDocumentClick }) => {
  const { showOverlay } = useOverlayContext();

  const handleExpandPreview = (event: React.MouseEvent) => {
    event.stopPropagation();
    showOverlay(<ExpandPreview handleCreateDocument={onCreateDocumentClick} form={form} />);
  };

  return (
    <>
      <div
        className="h-full w-full flex flex-col bg-white rounded-lg shadow-md border border-gray-200 w-11/12 p-4 cursor-pointer hover:bg-cerulean-50 cursor-pointer hover:bg-cerulean-50"
        onClick={handleExpandPreview}
      >
        <div className="flex-1">
          <h1 className="font-bold text-base tracking-normal align-middle h-full py-4 leading-5 text-cerulean-500 hover:text-cerulean-800">
            {form.name}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={handleExpandPreview}
            className="absolute text-white mt-3 ml-3 z-10 flex items-center text-blue-600 hover:text-blue-800 font-medium bg-cloud-500 px-3 py-1 rounded-lg m-2 flex items-center justify-center"
          >
            <img src="/static/creator/expand.svg" alt="Expand" />
            <span>Expand Preview</span>
          </button>
          <div className="relative bg-cerulean-50 border border-gray-200 rounded-xl overflow-hidden h-[240px]">
            <img
              src={form.img}
              alt={form.name}
              className="absolute p-1"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
