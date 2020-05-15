import React, { useState } from "react";
import { OverlayContentBaseStyle } from "./../Overlay";
import { TableStyle } from "./../../../AddressResolver/AddressesTable";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { useAddressResolved } from "../../../../common/hooks/useAddressResolved";
import { SvgIcon, SvgIconSearch } from "../../../UI/SvgIcon";
import { CsvUploadButton } from "../../../AddressBook/CsvUploadButton";
import { isEmpty } from "lodash";
import { makeEtherscanAddressURL } from "../../../../utils";
import { vars } from "../../../../styles";

export const AddressBook = styled(({ ...props }: OverlayContentProps) => {
  const { addressResolved } = useAddressResolved();
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTermChanged = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  return (
    <OverlayContent {...props}>
      <div className="overlay-actionsbar">
        <div className="row align-items-center">
          <div className="col">
            <div className="overlay-searchbar">
              <div className="row no-gutters align-items-center">
                <div className="col">
                  <input type="text" placeholder="Search" value={searchTerm} onChange={onSearchTermChanged} />
                </div>
                <div className="col-auto">
                  <SvgIcon>
                    <SvgIconSearch />
                  </SvgIcon>
                </div>
              </div>
            </div>
          </div>
          <div className="col-auto ml-auto">
            <CsvUploadButton />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead className="table-thead">
            <tr>
              <th>Name</th>
              <td>ID</td>
            </tr>
          </thead>
          <tbody className="table-tbody">
            {isEmpty(addressResolved) ? (
              <tr className="text-center p-2">
                <td className="border-0">No Address found.</td>
              </tr>
            ) : (
              Object.keys(addressResolved).map((key) => {
                const name = addressResolved[key];
                const address = key;
                const addressHref = makeEtherscanAddressURL(key);

                const searchTermLowerCase = searchTerm.toLowerCase();
                const nameLowerCase = name.toLowerCase();
                const addressLowerCase = address.toLowerCase();

                return (
                  <tr
                    key={key}
                    className={
                      nameLowerCase.includes(searchTermLowerCase) || addressLowerCase.includes(searchTermLowerCase)
                        ? ""
                        : "d-none"
                    }
                  >
                    <th>{name}</th>
                    <td>
                      <a href={addressHref} target="_blank" rel="noreferrer noopener">
                        {address}
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}
  ${TableStyle()}

  max-width: 760px;
  max-height: 600px;

  .overlay-searchbar {
    border: solid 1px ${vars.greyLight};
    padding: 5px 10px;
    max-width: 300px;

    input {
      border: none;
      outline: none;
      width: 100%;

      &::placeholder {
        font-style: italic;
        color: ${vars.greyLight};
      }
    }

    svg {
      color: ${vars.grey};
    }
  }

  .overlay-actionsbar {
    margin-bottom: 20px;
  }

  .table {
    th {
      flex: 0 1 180px;
      min-width: 180px;
    }
  }

  .table-tbody {
    height: 360px;
  }
`;
