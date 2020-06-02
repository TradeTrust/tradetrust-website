import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave, SvgIconEdit2 } from "../UI/SvgIcon";
import { vars } from "../../styles";
import isURL from "validator/lib/isURL";
import isEmpty from "validator/lib/isEmpty";

interface EndpointEntryProps {
  className?: string;
  orderNumber: number;
  api: string;
  name: string;
  canEdit: boolean;
  removeEndpoint: () => void;
  onMoveEntryUp?: () => void;
  onMoveEntryDown?: () => void;
  onUpdateEndpoint: (name: string, endpoint: string) => void;
  isEndpointUrlExists: (endpoint: string) => boolean;
}

export const EndpointEntry = styled(
  ({
    className,
    orderNumber,
    removeEndpoint,
    api,
    name,
    canEdit,
    onMoveEntryUp,
    onMoveEntryDown,
    onUpdateEndpoint,
    isEndpointUrlExists,
  }: EndpointEntryProps) => {
    const [isEditable, setEditable] = useState(canEdit);
    const [inputErrorMessageName, setInputErrorMessageName] = useState("");
    const [inputMessageEndpoint, setInputErrorMessageEndpoint] = useState("");
    const [endpointAPI, setEndpointAPIValue] = useState(api);
    const [endpointName, setEndpointNameValue] = useState(name);

    const onEndpointAPIChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointAPIValue(event.target.value);
    };

    const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointNameValue(event.target.value);
    };

    const canUpdateValue = () => {
      const nameTrimmed = endpointName.trim();
      const apiTrimmed = endpointAPI.trim();

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

      return true;
    };

    const onSave = () => {
      if (!canUpdateValue()) return;

      setEditable(false);
      setInputErrorMessageName("");
      setInputErrorMessageEndpoint("");
      setEndpointAPIValue("");
      setEndpointNameValue("");

      onUpdateEndpoint(endpointName.trim(), endpointAPI.trim());
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
              value={endpointAPI}
              onChange={onEndpointAPIChanged}
              errorMessage={inputMessageEndpoint}
            />
          ) : (
            <>{api}</>
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
