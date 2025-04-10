import React, { FunctionComponent } from "react";

interface FormSelectProps {
  id: string;
  form: any;
  onAddForm: () => void;
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({ form }) => {
  return (
    <>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 w-11/12 p-4">
        <div className="mb-4">
          <h1 className="font-bold text-base tracking-normal align-middle h-full py-4 leading-5 text-cerulean-500 hover:text-cerulean-800">
            {form.name}
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={() => console.log("Expand clicked")}
            className="absolute text-white mt-3 ml-3 z-10 flex items-center text-blue-600 hover:text-blue-800 font-medium bg-cloud-500 px-3 py-1 rounded-lg m-2 flex items-center justify-center"
          >
            <img src="/static/creator/expand.svg" alt="Expand" />
            <span>Expand Preview</span>
          </button>
          <div
            className="relative bg-cerulean-50 border border-gray-200 rounded-xl overflow-hidden "
            style={{ height: "240px", minHeight: "240px" }}
          >
            <img
              src={form.img}
              alt="Certificate of Origin"
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
