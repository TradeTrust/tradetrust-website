import { getFeatures, ThirdPartyAPIEntryProps } from "@tradetrust-tt/address-identity-resolver";
import React, { FunctionComponent, useState } from "react";
import { Edit, Trash2 } from "react-feather";
import isEmpty from "validator/lib/isEmpty";
import isURL from "validator/lib/isURL";
import { Input } from "../../UI/Input";
import { LoaderSpinner } from "../../UI/Loader";
import { AddResolverConfirmation } from "../../UI/Overlay/OverlayContent";
import { useOverlayContext } from "../../../common/contexts/OverlayContext";
import { Button } from "../../Button";

interface EndpointEntryProps {
  orderNumber: number;
  api: string;
  name: string;
  apiHeader: string;
  apiKey: string;
  canEdit: boolean;
  removeEndpoint: () => void;
  onMoveEntryUp?: () => void;
  onMoveEntryDown?: () => void;
  onUpdateEndpoint: (newValues: ThirdPartyAPIEntryProps) => void;
  isEndpointUrlExists: (endpoint: string) => boolean;
}

export const EndpointEntry: FunctionComponent<EndpointEntryProps> = ({
  orderNumber,
  removeEndpoint,
  api,
  name,
  apiHeader,
  apiKey,
  canEdit,
  onMoveEntryUp,
  onMoveEntryDown,
  onUpdateEndpoint,
  isEndpointUrlExists,
}: EndpointEntryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setEditable] = useState(canEdit);
  const [inputErrorMessageName, setInputErrorMessageName] = useState("");
  const [inputErrorMessageEndpoint, setInputErrorMessageEndpoint] = useState("");
  const [inputErrorMessageApiHeader, setInputErrorMessageApiHeader] = useState("");
  const [inputErrorMessageApiKey, setInputErrorMessageApiKey] = useState("");
  const [endpointApi, setEndpointApi] = useState(api);
  const [endpointName, setEndpointName] = useState(name);
  const [endpointApiHeader, setEndpointApiHeader] = useState(apiHeader);
  const [endpointApiKey, setEndpointApiKey] = useState(apiKey);
  const { showOverlay } = useOverlayContext();

  const onEndpointApiChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndpointApi(event.target.value);
  };

  const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndpointName(event.target.value);
  };

  const onEndpointApiHeaderChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndpointApiHeader(event.target.value);
  };

  const onEndpointApiKeyChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEndpointApiKey(event.target.value);
  };

  const onSetAllError = (msg: string): void => {
    setInputErrorMessageName(msg);
    setInputErrorMessageEndpoint(msg);
    setInputErrorMessageApiHeader(msg);
    setInputErrorMessageApiKey(msg);
  };

  const canUpdateValue = (): boolean => {
    const nameTrimmed = endpointName.trim();
    const apiTrimmed = endpointApi.trim();
    const apiHeaderTrimmed = endpointApiHeader.trim();
    const apiKeyTrimmed = endpointApiKey.trim();

    setInputErrorMessageName("");
    setInputErrorMessageEndpoint("");
    setInputErrorMessageApiHeader("");
    setInputErrorMessageApiKey("");

    if (isEmpty(nameTrimmed)) {
      setInputErrorMessageName("Name must not be blank.");
      return false;
    }

    if (isEmpty(apiTrimmed)) {
      setInputErrorMessageEndpoint("Endpoint must not be blank.");
      return false;
    }

    if (!isURL(apiTrimmed)) {
      setInputErrorMessageEndpoint("Endpoint must be an valid url.");
      return false;
    }

    if (isEndpointUrlExists(apiTrimmed)) {
      setInputErrorMessageEndpoint("Endpoint already exists.");
      return false;
    }

    if (isEmpty(apiHeaderTrimmed)) {
      setInputErrorMessageApiHeader("API Header must not be blank.");
      return false;
    }

    if (isEmpty(apiKeyTrimmed)) {
      setInputErrorMessageApiKey("API Key must not be blank.");
      return false;
    }

    return true;
  };

  const onSave = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!canUpdateValue()) {
        setIsLoading(false);
        return;
      }

      const { features } = await getFeatures(endpointApi, endpointApiHeader, endpointApiKey);

      setEditable(false);

      onUpdateEndpoint({
        name: endpointName.trim(),
        endpoint: endpointApi.trim(),
        apiHeader: endpointApiHeader.trim(),
        apiKey: endpointApiKey.trim(),
        path: {
          addressResolution: features.addressResolution?.location,
          entityLookup: features.entityLookup?.location,
        },
      });

      showOverlay(<AddResolverConfirmation />);
    } catch (e) {
      if (e instanceof Error) {
        onSetAllError(e.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <div
      className="group p-4 bg-white lg:even:bg-cerulean-50 shadow-lg lg:shadow-none rounded-xl lg:rounded-none my-8 lg:my-0 max-w-md lg:max-w-full"
      data-testid={`endpoint-entry-row-${orderNumber}`}
    >
      <div className="flex flex-wrap relative">
        <div className="w-full lg:w-8 px-2">
          <div className="my-2 lg:my-0 lg:invisible lg:group-hover:visible">
            <div className="text-lg leading-3 text-cerulean-300">
              <i
                className={`w-auto lg:w-full fas fa-chevron-up leading-3 hover:text-cerulean-500 mr-2 lg:mb-2 lg:mr-0 cursor-pointer`}
                onClick={onMoveEntryUp}
                data-testid="endpoint-entry-move-up"
              />
              <i
                className={`w-auto lg:w-full fas fa-chevron-down leading-3 hover:text-cerulean-500 cursor-pointer`}
                onClick={onMoveEntryDown}
                data-testid="endpoint-entry-move-down"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/12 px-2">
          <div className="my-2 lg:my-0">
            <h4 className="text-cloud-800 lg:hidden">Order</h4>
            <div className="" data-testid="endpoint-entry-id">
              {orderNumber}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/12 px-2">
          <div className="my-2 lg:my-0">
            <h4 className="text-cloud-800 lg:hidden">Name</h4>
            {isEditable ? (
              <Input
                className="w-full"
                placeholder="Name"
                value={endpointName}
                onChange={onEndpointNameChanged}
                errorMessage={inputErrorMessageName}
              />
            ) : (
              <>{name}</>
            )}
          </div>
        </div>

        <div className="w-full lg:w-3/12 px-2">
          <div className="my-2 lg:my-0">
            <h4 className="text-cloud-800 lg:hidden">Endpoint</h4>
            {isEditable ? (
              <Input
                className="w-full"
                placeholder="Endpoint"
                value={endpointApi}
                onChange={onEndpointApiChanged}
                errorMessage={inputErrorMessageEndpoint}
              />
            ) : (
              <>{api}</>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/12 px-2">
          <div className="my-2 lg:my-0">
            <h4 className="text-cloud-800 lg:hidden">API Header</h4>
            {isEditable ? (
              <Input
                className="w-full"
                placeholder="API Header"
                value={endpointApiHeader}
                onChange={onEndpointApiHeaderChanged}
                errorMessage={inputErrorMessageApiHeader}
              />
            ) : (
              <>{apiHeader}</>
            )}
          </div>
        </div>

        <div className="w-full lg:w-2/12 px-2">
          <div className="my-2 lg:my-0">
            <h4 className="text-cloud-800 lg:hidden">API Key</h4>
            {isEditable ? (
              <Input
                className="w-full"
                placeholder="API Key"
                value={endpointApiKey}
                onChange={onEndpointApiKeyChanged}
                errorMessage={inputErrorMessageApiKey}
              />
            ) : (
              <>{apiKey}</>
            )}
          </div>
        </div>

        <div className="w-auto ml-auto px-2 absolute top-0 right-0 lg:relative">
          {!isEditable && (
            <div className="my-2 lg:my-0">
              <div className="text-cerulean-500 hover:text-cerulean-800">
                <div className="flex flex-wrap justify-end">
                  <Trash2 className="cursor-pointer" onClick={removeEndpoint} data-testid="trash2-icon" />
                  <Edit
                    className="ml-3 cursor-pointer"
                    onClick={() => {
                      setEditable(true);
                    }}
                    data-testid="edit-icon"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isEditable && (
        <div className="p-2 mt-2">
          <div className="flex flex-wrap items-center justify-center">
            <Button
              className="bg-scarlet-500 hover:bg-red-600 text-white text-base rounded-xl shadow-none mr-2"
              onClick={removeEndpoint}
            >
              <h5>Delete</h5>
            </Button>
            {isLoading ? (
              <LoaderSpinner />
            ) : (
              <Button
                className=" bg-cerulean-500 hover:bg-cerulean-800 text-white text-base rounded-xl shadow-none"
                onClick={onSave}
              >
                <h5>Save</h5>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
