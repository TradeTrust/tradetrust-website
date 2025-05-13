import React, { FunctionComponent } from "react";
import { Button } from "../../../Button";

interface DemoCreateButtonRowProps {
  onBack?: () => void;
  onNext?: () => void;
}

export const DemoCreateButtonRow: FunctionComponent<DemoCreateButtonRowProps> = ({ onBack, onNext }) => {
  return (
    <div className="flex justify-center pt-12 pb-3">
      {onBack && (
        <Button
          data-testid="demo-create-button-back"
          className="mx-12 bg-white text-cerulean-500 hover:bg-cloud-200"
          onClick={onBack}
        >
          Back
        </Button>
      )}
      {onNext && (
        <Button
          data-testid="demo-create-button-next"
          className="mx-12 bg-cerulean-500 text-white hover:bg-cerulean-800"
          onClick={onNext}
        >
          Next
        </Button>
      )}
    </div>
  );
};
