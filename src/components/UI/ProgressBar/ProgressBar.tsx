import React, { FunctionComponent } from "react";

export interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

export const ProgressBar: FunctionComponent<ProgressBarProps> = ({ step, totalSteps }) => {
  const bars = [...Array(totalSteps).keys()];
  const height = 4;

  return (
    <div data-testid="progress-bar" className="flex py-4">
      {bars.map((_, index) => {
        const progressIndex = index + 1;
        const isActiveStep = progressIndex === step;
        const isSameOrBeforeActiveStep = index < step;
        return (
          <div
            style={{ width: `${100 / totalSteps}%`, height: `${height}px` }}
            className={`${isSameOrBeforeActiveStep ? `bg-cerulean-500` : `bg-cloud-300`} mr-1 last:mr-0 relative`}
            key={`bar-${index}`}
          >
            {isActiveStep && (
              <div
                data-testid={`progress-bar-step-${progressIndex}`}
                style={{ marginTop: `${height / 2}px` }}
                className="w-6 h-6 bg-cerulean-500 items-center flex justify-center rounded-full text-white absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {progressIndex}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
