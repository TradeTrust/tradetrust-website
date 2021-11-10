import React from "react";
import { useDispatch } from "react-redux";
import { setActive } from "../../../reducers/sample";
import { updateCertificate } from "../../../reducers/certificate";
import { loadDemoCertificate } from "../../VerifyPageContent/helpers";

const topMessage = "To verify a demo document";
const btnMessage = "Click Here";
const bottomMessage = "or";

export const SampleMobile = (): React.ReactElement => {
  const dispatch = useDispatch();
  const loadCertificate = React.useCallback((payload: any) => dispatch(updateCertificate(payload)), [dispatch]);
  return (
    <div className="md:hidden flex flex-col">
      <p className="font-bold text-xl mb-4">{topMessage}</p>
      <button
        className="bg-tangerine text-white hover:bg-tangerine-600 rounded-xl font-bold py-2 px-3 mx-auto"
        draggable={false}
        onClick={(e: React.SyntheticEvent) => {
          e.stopPropagation();
          loadDemoCertificate(loadCertificate);
          dispatch(setActive());
        }}
      >
        {btnMessage}
      </button>
      <p className="font-bold text-xl mt-4">{bottomMessage}</p>
    </div>
  );
};
