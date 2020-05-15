import React, { useState } from "react";
import styled from "@emotion/styled";
import { InputDefault } from "../UI/Input";
import { SvgIcon, SvgIconTrash2, SvgIconSave } from "../UI/SvgIcon";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { vars } from "./../../styles";

interface AddEndpointProps {
  className?: string;
  order: number;
  id: string;
  removeNewEndpoint: (id: string) => void;
}

export const AddEndpoint = styled(({ className, order, id, removeNewEndpoint }: AddEndpointProps) => {
  const [endpointAPI, setEndpointAPIValue] = useState("");
  const [endpointName, setEndpointNameValue] = useState("");
  const { addThirdPartyAPIEndpoint } = useThirdPartyAPIEndpoints();

  const onEndpointAPIChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpointAPIValue(event.target.value);
  };

  const onEndpointNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndpointNameValue(event.target.value);
  };

  const onSaveApiEndpoint = (id: string) => {
    addThirdPartyAPIEndpoint({
      name: endpointName,
      endpoint: endpointAPI.trim(),
    });
    setEndpointAPIValue("");
    setEndpointNameValue("");

    setTimeout(() => {
      removeNewEndpoint(id);
    }, 0);
  };

  return (
    <tr className={className}>
      <th>{order}</th>
      <td>
        <InputDefault
          className="mb-0 w-100"
          onChange={onEndpointNameChanged}
          value={endpointName}
          placeholder="Name"
          required
        />
      </td>
      <td>
        <InputDefault
          className="mb-0 w-100"
          onChange={onEndpointAPIChanged}
          value={endpointAPI}
          placeholder="Endpoint"
          required
        />
      </td>
      <td>
        <div className="row no-gutters">
          <div className="col-auto">
            <SvgIcon
              onClick={() => {
                onSaveApiEndpoint(id);
              }}
            >
              <SvgIconSave />
            </SvgIcon>
          </div>
          <div className="col-auto ml-3">
            <SvgIcon
              onClick={() => {
                removeNewEndpoint(id);
              }}
            >
              <SvgIconTrash2 />
            </SvgIcon>
          </div>
        </div>
      </td>
    </tr>
  );
})`
  svg {
    polyline,
    path,
    line {
      color: ${vars.teal};
    }
  }
`;
