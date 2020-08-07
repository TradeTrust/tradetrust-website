import React, { useContext } from "react";
import styled from "@emotion/styled";
import { lighten } from "polished";
import { vars } from "./../../styles";
import { EndpointEntry } from "./EndpointEntry";
import { useThirdPartyAPIEndpoints, ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { OverlayContext } from "../../common/contexts/OverlayContext";
import { DeleteResolverConfirmation } from "../UI/Overlay/OverlayContent/DeleteResolverConfirmation";
import { fontSize } from "../../styles/abstracts/mixin";

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
  isNewEndpoint: boolean;
  setNewEndpoint: (isNewEndpoint: boolean) => void;
}

export const AddressesTable = styled(({ className, isNewEndpoint, setNewEndpoint }: AddressesTableProps) => {
  const {
    thirdPartyAPIEndpoints,
    addThirdPartyAPIEndpoint,
    removeThirdPartyAPIEndpoint,
    setThirdPartyAPIEndpoints,
  } = useThirdPartyAPIEndpoints();
  const { showOverlay, setOverlayVisible } = useContext(OverlayContext);

  const deleteAddress = (index: number) => {
    removeThirdPartyAPIEndpoint(index);
    setOverlayVisible(false);
  };

  const onRemoveEndpoint = (name: string, index: number) => {
    showOverlay(
      <DeleteResolverConfirmation
        title="Delete Address Resolver"
        name={name}
        deleteAddress={() => {
          deleteAddress(index);
        }}
      />
    );
  };

  const isCurrentEndpointUrlExists = (currentEndpoint: string) => (endpoint: string) => {
    const omitCurrent = thirdPartyAPIEndpoints.filter((item) => {
      return item.endpoint !== currentEndpoint;
    });

    const isFound = !!omitCurrent.find((item) => {
      return item.endpoint === endpoint;
    });
    return isFound;
  };

  const isEndpointUrlExists = (endpoint: string) => {
    const isFound = !!thirdPartyAPIEndpoints.find((item) => {
      return item.endpoint === endpoint;
    });
    return isFound;
  };

  const addNewEndpoint = (newValues: ThirdPartyAPIEntryProps) => {
    addThirdPartyAPIEndpoint(newValues);
    setNewEndpoint(false);
  };

  const onUpdateEndpoint = (index: number) => (newValues: ThirdPartyAPIEntryProps) => {
    const newEndpoint = [...thirdPartyAPIEndpoints];
    newEndpoint.splice(index, 1, newValues);
    setThirdPartyAPIEndpoints(newEndpoint);
  };

  const swapArray = (indexA: number, indexB: number) => {
    const toOrdered = [...thirdPartyAPIEndpoints];

    const to = toOrdered[indexB];
    const from = toOrdered[indexA];
    toOrdered[indexA] = to;
    toOrdered[indexB] = from;

    setThirdPartyAPIEndpoints(toOrdered);
  };

  const moveEntryUp = (id: number) => {
    if (id === 0) return;
    swapArray(id - 1, id);
  };

  const moveEntryDown = (id: number) => {
    if (id + 1 >= thirdPartyAPIEndpoints.length) return;
    swapArray(id + 1, id);
  };

  return (
    <div className={`${className} row py-4`}>
      <div className="col-12 col-lg">
        <div className="table-responsive">
          <table className="table">
            <thead className="table-thead">
              <tr>
                <th />
                <td>Order</td>
                <td>Name</td>
                <td>Endpoint</td>
                <td>API Header</td>
                <td>API Key</td>
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody className="table-tbody">
              {thirdPartyAPIEndpoints.length === 0 && !isNewEndpoint && (
                <tr>
                  <th />
                  <td>&mdash;</td>
                  <td>&mdash;</td>
                  <td>No third party&apos;s endpoint found.</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              )}
              {thirdPartyAPIEndpoints.map((item, index) => {
                const orderNumber = index + 1;

                return (
                  <EndpointEntry
                    key={item.endpoint}
                    orderNumber={orderNumber}
                    isEndpointUrlExists={isCurrentEndpointUrlExists(item.endpoint)}
                    removeEndpoint={() => {
                      onRemoveEndpoint(item.name, index);
                    }}
                    onMoveEntryUp={() => {
                      moveEntryUp(index);
                    }}
                    onMoveEntryDown={() => {
                      moveEntryDown(index);
                    }}
                    onUpdateEndpoint={onUpdateEndpoint(index)}
                    api={thirdPartyAPIEndpoints[index].endpoint}
                    name={thirdPartyAPIEndpoints[index].name}
                    apiHeader={thirdPartyAPIEndpoints[index].apiHeader}
                    apiKey={thirdPartyAPIEndpoints[index].apiKey}
                    canEdit={false}
                  />
                );
              })}
              {isNewEndpoint && (
                <EndpointEntry
                  orderNumber={thirdPartyAPIEndpoints.length + 1}
                  isEndpointUrlExists={isEndpointUrlExists}
                  removeEndpoint={() => {
                    setNewEndpoint(false);
                  }}
                  onUpdateEndpoint={addNewEndpoint}
                  api=""
                  name=""
                  apiHeader=""
                  apiKey=""
                  canEdit={true}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
})`
  ${TableStyle()}

  th {
    width: 30px;
    text-align: center;

    .fas {
      transition: color 0.3s ${vars.easeOutCubic}, opacity 0.3s ${vars.easeOutCubic},
        visibility 0.3s ${vars.easeOutCubic};
      display: block;
      cursor: pointer;
      color: ${vars.grey};
      line-height: 0.5;
      ${fontSize(20)};

      &:hover {
        color: ${vars.greyDark};
      }

      &.fa-sort-up {
        padding-top: 8px;
      }

      &.fa-sort-down {
        padding-bottom: 8px;
      }
    }
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
      width: 80px;
    }

    &:nth-of-type(2) {
      width: 200px;
    }

    &:nth-of-type(3) {
      width: 360px;
    }

    &:nth-of-type(4) {
      width: 200px;
    }

    &:nth-of-type(5) {
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
