import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave, SvgIconEdit2 } from "../UI/SvgIcon";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { vars } from "../../styles";

interface EndpointEntryProps {
  className?: string;
  order: number;
  removeEndpoint: () => void;
  api?: string;
  name?: string;
  canEdit?: boolean;
}

export const EndpointEntry = styled(
  ({ className, order, removeEndpoint, api = "", name = "", canEdit = false }: EndpointEntryProps) => {
    const [isEditable, setEditable] = useState(canEdit);
    const [inputErrorMessageName, setInputErrorMessageName] = useState("");
    const [inputMessageEndpoint, setInputErrorMessageEndpoint] = useState("");
    const [endpointAPI, setEndpointAPIValue] = useState(api);
    const [endpointName, setEndpointNameValue] = useState(name);
    const { addThirdPartyAPIEndpoint } = useThirdPartyAPIEndpoints();

    const onEndpointAPIChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointAPIValue(event.target.value);
    };

    const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndpointNameValue(event.target.value);
    };

    const onEditApiEndpoint = () => {
      alert("to be implemented");
      // setEditable(true);
    };

    const onSaveApiEndpoint = () => {
      const name = endpointName.trim();
      const endpoint = endpointAPI.trim();

      if (name === "") {
        setInputErrorMessageName("Name must not be blank.");
      }

      if (endpoint === "") {
        setInputErrorMessageEndpoint("Endpoint must not be blank.");
      }

      if (name === "" || endpoint === "") {
        return;
      } // basic validation

      setEditable(false);
      setInputErrorMessageName("");
      setInputErrorMessageEndpoint("");

      addThirdPartyAPIEndpoint({
        name: endpointName.trim(),
        endpoint: endpointAPI.trim(),
      });
      setEndpointAPIValue("");
      setEndpointNameValue("");

      setTimeout(() => {
        removeEndpoint();
      }, 0);
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
                onSaveApiEndpoint();
              }}
            >
              <SvgIconSave />
            </SvgIcon>
          ) : (
            <SvgIcon
              onClick={() => {
                onEditApiEndpoint();
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
