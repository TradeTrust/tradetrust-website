import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave, SvgIconEdit2 } from "../UI/SvgIcon";
import { vars } from "../../styles";
import isURL from "validator/lib/isURL";
import isEmpty from "validator/lib/isEmpty";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";

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

    const onSave = () => {
      if (!canUpdateValue()) return;

      setEditable(false);

      onUpdateEndpoint({
        name: endpointName.trim(),
        endpoint: endpointApi.trim(),
        apiHeader: endpointApiHeader.trim(),
        apiKey: endpointApiKey.trim(),
      });
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
              className="mb-0 w-100"
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
              className="mb-0 w-100"
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
              className="mb-0 w-100"
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
              className="mb-0 w-100"
              placeholder="API Key"
              value={endpointApiKey}
              onChange={onEndpointApiKeyChanged}
              errorMessage={inputErrorMessageApiKey}
            />
          ) : (
            <>{apiKey}</>
          )}
        </td>
        <td className={isEditable ? "is-editable" : ""}>
          {isEditable ? (
            <SvgIcon onClick={onSave}>
              <SvgIconSave />
            </SvgIcon>
          ) : (
            <SvgIcon
              onClick={() => {
                setEditable(true);
              }}
            >
              <SvgIconEdit2 />
            </SvgIcon>
          )}
          <SvgIcon onClick={removeEndpoint}>
            <SvgIconTrash2 />
          </SvgIcon>
        </td>
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
