import React from "react";
import styled from "@emotion/styled";
import { lighten } from "polished";
import { vars } from "./../../styles";
import { EndpointEntry } from "./EndpointEntry";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { NewEndpointsEntryProps } from "./index";

export const TableStyle = () => {
  return `
    .table-responsive {
      border: solid 1px ${vars.greyLight};
    }

    .table {
      width: 100%;
      margin-bottom: 0;
    }

    tr {
      white-space: nowrap;
      border-top: solid 1px ${vars.greyLighter};;
    }

    th {
      vertical-align: middle;
      border-top: none;
    }

    td {
      vertical-align: middle;
      white-space: nowrap;
      border-top: none;
    }

    .table-thead {
      th,
      td {
        border: none;
      }
    }

    .table-thead {
      color: ${vars.white};
      background-color: ${vars.brandNavy};
    }

    .table-tbody {
      background-color: ${vars.white};

      tr {
        &:nth-of-type(even) {
          background-color: ${vars.greyLightest};
        }
      }
    }
  `;
};

interface AddressesTableProps {
  className?: string;
  newEndpointsEntries: NewEndpointsEntryProps[];
  removeNewEndpoint: (id: string) => void;
}

export const AddressesTable = styled(({ className, newEndpointsEntries, removeNewEndpoint }: AddressesTableProps) => {
  const { thirdPartyAPIEndpoints, removeThirdPartyAPIEndpoint } = useThirdPartyAPIEndpoints();

  return (
    <div className={`${className} row py-4`}>
      <div className="col-12 col-lg">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-thead">
              <tr>
                <th>Order</th>
                <td>Name</td>
                <td>Endpoint</td>
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody className="table-tbody">
              {thirdPartyAPIEndpoints.length === 0 && newEndpointsEntries.length === 0 && (
                <tr>
                  <th>&mdash;</th>
                  <td>&mdash;</td>
                  <td>No third party&apos;s endpoint found.</td>
                  <td>&nbsp;</td>
                </tr>
              )}
              {thirdPartyAPIEndpoints.length > 0 &&
                thirdPartyAPIEndpoints.map((item, index) => {
                  const order = index + 1;
                  return (
                    <EndpointEntry
                      key={item.id}
                      id={item.id}
                      order={order}
                      removeEndpoint={() => {
                        removeThirdPartyAPIEndpoint(item.id);
                      }}
                      api={item.endpoint}
                      name={item.name}
                    />
                  );
                })}
              {newEndpointsEntries.length > 0 &&
                newEndpointsEntries.map((item, index) => {
                  const order = index + 1 + thirdPartyAPIEndpoints.length;
                  return (
                    <EndpointEntry
                      key={item.id}
                      id={item.id}
                      order={order}
                      removeEndpoint={() => {
                        removeNewEndpoint(item.id);
                      }}
                      canEdit={true}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
})`
  ${TableStyle()}

  th {
    width: 80px;
  }

  td {
    &.is-editable {
      &:last-of-type {
        svg {
          &:hover {
            polyline,
            path,
            line {
              color: ${lighten(0.05, vars.teal)};
            }
          }
        }
      }
    }

    &:nth-of-type(1) {
      width: 200px;
    }

    &:last-of-type {
      text-align: right;
      width: 100px;

      svg {
        cursor: pointer;
        margin-left: 15px;

        polyline,
        path,
        line {
          transition: color 0.3s ease-out;
          color: ${vars.grey};
        }

        &:first-of-type {
          margin-left: 0;
        }

        &:hover {
          polyline,
          path,
          line {
            color: ${lighten(0.1, vars.grey)};
          }
        }
      }
    }
  }
`;
