import React from "react";
import { useThirdPartyAPIEndpoints, ThirdPartyAPIEntryProps } from "./../../common/hooks/useThirdPartyAPIEndpoints";
import { reject } from "lodash";

export const AddressEndpoints = () => {
  const { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

  const removeThirdPartyAPIEndpoint = (endpointToRemove: string) => {
    const endpoints = reject(thirdPartyAPIEndpoints, { endpoint: endpointToRemove });
    setThirdPartyAPIEndpoints(endpoints);
  };

  const onRemoveEndpoint = (endpoint: string) => {
    removeThirdPartyAPIEndpoint(endpoint);
  };

  console.log({}, "AddressEndpoints");

  return (
    <div className="row my-4">
      <div className="col-12">
        <b>AddressEndpoints (LocalStorage):</b>
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
