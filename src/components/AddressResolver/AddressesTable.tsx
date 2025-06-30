import { ThirdPartyAPIEntryProps, useThirdPartyAPIEndpoints } from "@tradetrust-tt/address-identity-resolver";
import React, { FunctionComponent } from "react";
import { DeleteResolverConfirmation } from "../UI/Overlay/OverlayContent";
import { EndpointEntry } from "./EndpointEntry";
import { useOverlayContext } from "../../common/contexts/OverlayContext";

export interface AddressesTableProps {
  isNewEndpoint: boolean;
  setNewEndpoint: (isNewEndpoint: boolean) => void;
}

export const AddressesTable: FunctionComponent<AddressesTableProps> = ({ isNewEndpoint, setNewEndpoint }) => {
  const { thirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, removeThirdPartyAPIEndpoint, setThirdPartyAPIEndpoints } =
    useThirdPartyAPIEndpoints();
  const { showOverlay, setOverlayVisible } = useOverlayContext();

  const deleteAddress = (index: number): void => {
    removeThirdPartyAPIEndpoint(index);
    setOverlayVisible(false);
  };

  const onRemoveEndpoint = (name: string, index: number): void => {
    showOverlay(
      <DeleteResolverConfirmation
        title="Delete Address Resolver"
        name={name}
        deleteAddress={() => {
          deleteAddress(index);
        }}
      />
    );
  };

  const isCurrentEndpointUrlExists = (currentEndpoint: string) => (endpoint: string) => {
    const omitCurrent = thirdPartyAPIEndpoints.filter((item) => {
      return item.endpoint !== currentEndpoint;
    });

    const isFound = !!omitCurrent.find((item) => {
      return item.endpoint === endpoint;
    });
    return isFound;
  };

  const isEndpointUrlExists = (endpoint: string): boolean => {
    const isFound = !!thirdPartyAPIEndpoints.find((item) => {
      return item.endpoint === endpoint;
    });
    return isFound;
  };

  const addNewEndpoint = (newValues: ThirdPartyAPIEntryProps): void => {
    addThirdPartyAPIEndpoint(newValues);
    setNewEndpoint(false);
  };

  const onUpdateEndpoint = (index: number) => (newValues: ThirdPartyAPIEntryProps) => {
    const newEndpoint = [...thirdPartyAPIEndpoints];
    newEndpoint.splice(index, 1, newValues);
    setThirdPartyAPIEndpoints(newEndpoint);
  };

  const swapArray = (indexA: number, indexB: number): void => {
    const toOrdered = [...thirdPartyAPIEndpoints];

    const to = toOrdered[indexB];
    const from = toOrdered[indexA];
    toOrdered[indexA] = to;
    toOrdered[indexB] = from;

    setThirdPartyAPIEndpoints(toOrdered);
  };

  const moveEntryUp = (id: number): void => {
    if (id === 0) return;
    swapArray(id - 1, id);
  };

  const moveEntryDown = (id: number): void => {
    if (id + 1 >= thirdPartyAPIEndpoints.length) return;
    swapArray(id + 1, id);
  };

  return (
    <>
      <div className="p-4 hidden lg:flex">
        <div className="px-2 w-8" />
        <div className="px-2 w-1/12">
          <h4 className="text-cloud-800">Order</h4>
        </div>
        <div className="px-2 w-2/12">
          <h4 className="text-cloud-800">Name</h4>
        </div>
        <div className="px-2 w-3/12">
          <h4 className="text-cloud-800">Endpoint</h4>
        </div>
        <div className="px-2 w-2/12">
          <h4 className="text-cloud-800">API Header</h4>
        </div>
        <div className="px-2 w-2/12">
          <h4 className="text-cloud-800">API Key</h4>
        </div>
        <div className="px-2 w-auto ml-auto" />
      </div>
      {thirdPartyAPIEndpoints.map((item, index) => {
        const orderNumber = index + 1;

        return (
          <EndpointEntry
            key={item.endpoint}
            orderNumber={orderNumber}
            isEndpointUrlExists={isCurrentEndpointUrlExists(item.endpoint)}
            removeEndpoint={() => {
              onRemoveEndpoint(item.name, index);
            }}
            onMoveEntryUp={() => {
              moveEntryUp(index);
            }}
            onMoveEntryDown={() => {
              moveEntryDown(index);
            }}
            onUpdateEndpoint={onUpdateEndpoint(index)}
            api={thirdPartyAPIEndpoints[index].endpoint}
            name={thirdPartyAPIEndpoints[index].name}
            apiHeader={thirdPartyAPIEndpoints[index].apiHeader}
            apiKey={thirdPartyAPIEndpoints[index].apiKey}
            canEdit={false}
          />
        );
      })}
      {isNewEndpoint && (
        <EndpointEntry
          orderNumber={thirdPartyAPIEndpoints.length + 1}
          isEndpointUrlExists={isEndpointUrlExists}
          removeEndpoint={() => {
            setNewEndpoint(false);
          }}
          onUpdateEndpoint={addNewEndpoint}
          api=""
          name=""
          apiHeader=""
          apiKey=""
          canEdit={true}
        />
      )}
      {thirdPartyAPIEndpoints.length === 0 && !isNewEndpoint && (
        <div className="bg-white rounded-xl shadow-lg h-12 mt-6 lg:bg-cerulean-50 lg:rounded-none lg:shadow-none">
          <p className="flex text-cloud-800 h-full justify-center items-center">
            No third party&apos;s endpoint found.{" "}
          </p>
        </div>
      )}
    </>
  );
};
