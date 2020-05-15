import React from "react";
import styled from "@emotion/styled";
import { vars } from "./../../styles";
import { AddEndpoint } from "./AddEndpoint";
import { SvgIcon, SvgIconTrash2, SvgIconEdit2 } from "../UI/SvgIcon";
import { useThirdPartyAPIEndpoints, ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { NewEndpointsEntryProps } from "./index";

export const TableStyle = () => {
  return `
    .table-responsive {
      border: solid 1px ${vars.greyLight};
    }

    .table {
      width: 100%;
      margin-bottom: 0;

      th {
        border-top: none;
      }

      tr {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        border-top: solid 1px ${vars.greyLighter};;
      }

      td {
        flex: 1 0 auto;
        border-top: none;
      }

      .table-thead {
        th,
        td {
          border: none;
        }
      }
    }

    .table-thead {
      color: ${vars.white};
      background-color: ${vars.brandNavy};
    }

    .table-tbody {
      display: block;
      overflow: auto;
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
                <td />
              </tr>
            </thead>
            <tbody className="table-tbody">
              {thirdPartyAPIEndpoints.length === 0 && newEndpointsEntries.length === 0 && (
                <tr className="text-center px-2">
                  <td className="border-0 w-100">No third party&apos;s endpoint found.</td>
                </tr>
              )}
              {newEndpointsEntries.length > 0 &&
                newEndpointsEntries.map((item, index) => {
                  const order = index + 1;
                  return <AddEndpoint key={item.id} id={item.id} order={order} removeNewEndpoint={removeNewEndpoint} />;
                })}
              {thirdPartyAPIEndpoints.length > 0 &&
                thirdPartyAPIEndpoints.map((item: ThirdPartyAPIEntryProps, index) => {
                  const order = index + 1 + newEndpointsEntries.length;
                  return (
                    <tr key={index}>
                      <th>{order}</th>
                      <td>{item.name}</td>
                      <td>{item.endpoint}</td>
                      <td>
                        <div className="row no-gutters">
                          <div className="col-auto">
                            <SvgIcon
                              onClick={() => {
                                alert("not implemented yet");
                              }}
                            >
                              <SvgIconEdit2 />
                            </SvgIcon>
                          </div>

                          <div className="col-auto ml-3">
                            <SvgIcon
                              onClick={() => {
                                removeThirdPartyAPIEndpoint(index);
                              }}
                            >
                              <SvgIconTrash2 />
                            </SvgIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
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

  .table {
    th {
      flex: 0 1 80px;
      min-width: 80px;
    }

    td {
      &:first-of-type {
        flex: 0 1 180px;
        min-width: 180px;
      }

      &:last-of-type {
        flex: 0 1 auto;
      }
    }
  }

  svg {
    cursor: pointer;

    path,
    line {
      color: ${vars.grey};
    }
  }
`;
