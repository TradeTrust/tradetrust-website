import styled from "@emotion/styled";
import React, { useState } from "react";
import { Edit, Save, Trash2 } from "react-feather";
import isEmpty from "validator/lib/isEmpty";
import isURL from "validator/lib/isURL";
import { ThirdPartyAPIEntryProps } from "../../../common/hooks/useThirdPartyAPIEndpoints";
import { getFeatures } from "../../../services/addressResolver";
import { vars } from "../../../styles";
import { InputDefault } from "../../UI/Input";
import { LoaderSpinner } from "../../UI/Loader";

interface EndpointEntryProps {
  className?: string;
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

export const EndpointEntry = styled(
  ({
    className,
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

    const onEndpointApiChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointApi(event.target.value);
    };

    const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointName(event.target.value);
    };

    const onEndpointApiHeaderChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointApiHeader(event.target.value);
    };

    const onEndpointApiKeyChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointApiKey(event.target.value);
    };

    const onSetAllError = (msg: string) => {
      setInputErrorMessageName(msg);
      setInputErrorMessageEndpoint(msg);
      setInputErrorMessageApiHeader(msg);
      setInputErrorMessageApiKey(msg);
    };

    const canUpdateValue = () => {
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

      if (isEmpty(apiHeaderTrimmed) && !isEmpty(apiKeyTrimmed)) {
        setInputErrorMessageApiHeader("API Header must not be blank.");
        return false;
      }

      if (!isEmpty(apiHeaderTrimmed) && isEmpty(apiKeyTrimmed)) {
        setInputErrorMessageApiKey("API Key must not be blank.");
        return false;
      }

      return true;
    };

    const onSave = async () => {
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
      } catch (e) {
        onSetAllError(e.message);
      }
      setIsLoading(false);
    };

    return (
      <tr className={className}>
        <th>
          {!isEditable && (
            <>
              <i className="fas fa-sort-up" onClick={onMoveEntryUp} />
              <i className="fas fa-sort-down" onClick={onMoveEntryDown} />
            </>
          )}
        </th>
        <td>{orderNumber}</td>
        <td>
          {isEditable ? (
            <InputDefault
              className="mb-0 w-full"
              placeholder="Name"
              value={endpointName}
              onChange={onEndpointNameChanged}
              errorMessage={inputErrorMessageName}
            />
          ) : (
            <>{name}</>
          )}
        </td>
        <td>
          {isEditable ? (
            <InputDefault
              className="mb-0 w-full"
              placeholder="Endpoint"
              value={endpointApi}
              onChange={onEndpointApiChanged}
              errorMessage={inputErrorMessageEndpoint}
            />
          ) : (
            <>{api}</>
          )}
        </td>
        <td>
          {isEditable ? (
            <InputDefault
              className="mb-0 w-full"
              placeholder="API Header"
              value={endpointApiHeader}
              onChange={onEndpointApiHeaderChanged}
              errorMessage={inputErrorMessageApiHeader}
            />
          ) : (
            <>{apiHeader}</>
          )}
        </td>
        <td>
          {isEditable ? (
            <InputDefault
              className="mb-0 w-full"
              placeholder="API Key"
              value={endpointApiKey}
              onChange={onEndpointApiKeyChanged}
              errorMessage={inputErrorMessageApiKey}
            />
          ) : (
            <>{apiKey}</>
          )}
        </td>
        {isLoading ? (
          <td className={isEditable ? "is-editable" : ""}>
            <LoaderSpinner className="inline-block mx-2" />
          </td>
        ) : (
          <td className={isEditable ? "is-editable" : ""}>
            <div className="flex justify-around">
              {isEditable ? (
                <Save onClick={onSave} data-testid="save-icon" />
              ) : (
                <Edit
                  onClick={() => {
                    setEditable(true);
                  }}
                  data-testid="edit-icon"
                />
              )}
              <Trash2 onClick={removeEndpoint} data-testid="trash2-icon" />
            </div>
          </td>
        )}
      </tr>
    );
  }
)`
  .fa-sort-up,
  .fa-sort-down {
    opacity: 0;
    visibility: hidden;
  }

  &:hover {
    .fa-sort-up,
    .fa-sort-down {
      opacity: 1;
      visibility: visible;
    }
  }

  td {
    &.is-editable {
      &:last-of-type {
        svg {
          polyline,
          path,
          line {
            color: ${vars.teal};
          }
        }
      }
    }
  }
`;
