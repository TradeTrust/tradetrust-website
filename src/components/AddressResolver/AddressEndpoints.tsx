import React from "react";
import { useThirdPartyAPIEndpoints, ThirdPartyAPIEntryProps } from "./../../common/hooks/useThirdPartyAPIEndpoints";

export const AddressEndpoints = () => {
  const { thirdPartyAPIEndpoints, removeThirdPartyAPIEndpoint } = useThirdPartyAPIEndpoints();

  const onRemoveEndpoint = (endpoint: string) => {
    removeThirdPartyAPIEndpoint(endpoint);
  };

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressEndpoints (Settings [LocalStorage]):</b>
        {thirdPartyAPIEndpoints.map((item: ThirdPartyAPIEntryProps, key) => {
          return (
            <div className="row my-2" key={key}>
              <div className="col-auto">{item.name}</div>
              <div className="col-auto">{item.endpoint}</div>
              <div className="col-auto">
                <button
                  onClick={() => {
                    onRemoveEndpoint(item.endpoint);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
