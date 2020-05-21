import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave, SvgIconEdit2 } from "../UI/SvgIcon";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { vars } from "../../styles";
import isURL from "validator/lib/isURL";
import isEmpty from "validator/lib/isEmpty";

interface EndpointEntryProps {
  className?: string;
  id: number;
  order: number;
  removeEndpoint: () => void;
  api: string;
  name: string;
  canEdit: boolean;
}

export const EndpointEntry = styled(
  ({ className, id, order, removeEndpoint, api, name, canEdit }: EndpointEntryProps) => {
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

    const editEndpoint = (indexToReplace: number) => {
      const newEndpoints = thirdPartyAPIEndpoints.map((item, index) => {
        return index === indexToReplace
          ? {
              name: endpointName.trim(),
              endpoint: endpointAPI.trim(),
            }
          : item;
      });

      setThirdPartyAPIEndpoints(newEndpoints);
    };

    const saveEndpoint = () => {
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

    const onSaveApiEndpoint = (id: number) => {
      const name = endpointName.trim();
      const endpoint = endpointAPI.trim();

      if (isEmpty(name)) {
        setInputErrorMessageName("Name must not be blank.");
        return;
      }

      if (isEmpty(endpoint)) {
        setInputErrorMessageEndpoint("Endpoint must not be blank.");
        return;
      }

      if (!isURL(endpoint)) {
        setInputErrorMessageEndpoint("Endpoint must be an valid url.");
        return;
      }

      setEditable(false);
      setInputErrorMessageName("");
      setInputErrorMessageEndpoint("");

      const indexToReplace = thirdPartyAPIEndpoints.findIndex((item, index) => index === id);

      if (indexToReplace !== -1) {
        editEndpoint(indexToReplace);
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
          <SvgIcon onClick={removeEndpoint}>
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
