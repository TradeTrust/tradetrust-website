import React, { useContext } from "react";
import styled from "@emotion/styled";
import { lighten } from "polished";
import { vars } from "./../../styles";
import { EndpointEntry } from "./EndpointEntry";
import { useThirdPartyAPIEndpoints } from "../../common/hooks/useThirdPartyAPIEndpoints";
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
    if (id >= thirdPartyAPIEndpoints.length) return;
    swapArray(id, id - 1);
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
                </tr>
              )}
              {thirdPartyAPIEndpoints.map((item, index) => {
                const order = index + 1;
                return (
                  <EndpointEntry
                    key={item.endpoint}
                    id={index}
                    order={order}
                    removeEndpoint={() => {
                      onRemoveEndpoint(item.name, index);
                    }}
                    onMoveEntryUp={() => {
                      moveEntryUp(index);
                    }}
                    onMoveEntryDown={() => {
                      moveEntryDown(index);
                    }}
                    api={item.endpoint}
                    name={item.name}
                    canEdit={false}
                  />
                );
              })}
              {isNewEndpoint && (
                <EndpointEntry
                  id={thirdPartyAPIEndpoints.length + 1}
                  order={thirdPartyAPIEndpoints.length + 1}
                  removeEndpoint={() => {
                    setNewEndpoint(false);
                  }}
                  onMoveEntryDown={() => {
                    moveEntryDown(thirdPartyAPIEndpoints.length + 1);
                  }}
                  api=""
                  name=""
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
