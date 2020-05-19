import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave, SvgIconEdit2 } from "../UI/SvgIcon";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { vars } from "../../styles";
import { generateUniqueId } from "./../../common/utils/generateUniqueId";
import isURL from "validator/lib/isURL";
import isEmpty from "validator/lib/isEmpty";

interface EndpointEntryProps {
  className?: string;
  id: string;
  order: number;
  removeEndpoint: () => void;
  api?: string;
  name?: string;
  canEdit?: boolean;
}

export const EndpointEntry = styled(
  ({ className, id, order, removeEndpoint, api = "", name = "", canEdit = false }: EndpointEntryProps) => {
    const [isEditable, setEditable] = useState(canEdit);
    const [inputErrorMessageName, setInputErrorMessageName] = useState("");
    const [inputMessageEndpoint, setInputErrorMessageEndpoint] = useState("");
    const [endpointAPI, setEndpointAPIValue] = useState(api);
    const [endpointName, setEndpointNameValue] = useState(name);
    const { thirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, setThirdPartyAPIEndpoints } = useThirdPartyAPIEndpoints();

    const onEndpointAPIChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointAPIValue(event.target.value);
    };

    const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointNameValue(event.target.value);
    };

    const editEndpoint = (foundIndex: number) => {
      const copy = [...thirdPartyAPIEndpoints];
      copy[foundIndex].name = endpointName.trim();
      copy[foundIndex].endpoint = endpointAPI.trim();
      setThirdPartyAPIEndpoints([...copy]);
    };

    const saveEndpoint = () => {
      addThirdPartyAPIEndpoint({
        id: generateUniqueId(),
        name: endpointName.trim(),
        endpoint: endpointAPI.trim(),
      });
      setEndpointAPIValue("");
      setEndpointNameValue("");

      setTimeout(() => {
        removeEndpoint();
      }, 0);
    };

    const onSaveApiEndpoint = (id: string) => {
      const name = endpointName.trim();
      const endpoint = endpointAPI.trim();

      if (isEmpty(name)) {
        setInputErrorMessageName("Name must not be blank.");
      }

      if (isEmpty(endpoint)) {
        setInputErrorMessageEndpoint("Endpoint must not be blank.");
      }

      if (!isURL(endpoint)) {
        setInputErrorMessageEndpoint("Endpoint must not be a valid url.");
      }

      if (isEmpty(name) || isEmpty(endpoint) || !isURL(endpoint)) {
        return;
      } // basic validation

      setEditable(false);
      setInputErrorMessageName("");
      setInputErrorMessageEndpoint("");

      const foundIndex = thirdPartyAPIEndpoints.findIndex((item) => item.id === id);

      if (foundIndex !== -1) {
        editEndpoint(foundIndex);
      } else {
        saveEndpoint();
      }
    };

    return (
      <tr className={className}>
        <th>{order}</th>
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
            <SvgIcon
              onClick={() => {
                onSaveApiEndpoint(id);
              }}
            >
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
          <SvgIcon
            onClick={() => {
              removeEndpoint();
            }}
          >
            <SvgIconTrash2 />
          </SvgIcon>
        </td>
      </tr>
    );
  }
)`
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
