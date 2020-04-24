import React, { useState, useContext } from "react";
import { SvgIcon, SvgIconX, SvgIconSearch } from "../../UI/SvgIcon";
import { CsvUploadButton } from "../../AddressBook/CsvUploadButton";
import { AddressBook } from "../../../common/hooks/useAddressBook";
import { makeEtherscanAddressURL } from "../../../utils";
import { isEmpty } from "lodash";
import { CSSTransition } from "react-transition-group";
import styled from "@emotion/styled";
import { rgba } from "polished";
import { mixin, vars } from "../../../styles";
import { useLockBodyScroll } from "./../../../common/hooks/useLockBodyScroll";
import { OverlayContext } from "../../../common/context/OverlayContext";
import { ButtonSolidOrangeWhite, AnchorLinkButtonSolidOrangeWhite } from "./../../UI/Button";

const OverlayBaseStyle = () => {
  return `
    transition: visibility 0.4s 0.1s ${vars.easeOutCubic}, opacity 0.4s 0.1s ${vars.easeOutCubic};
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .overlay-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${rgba(vars.black, 0.4)};
    }

    .title-icon {
      svg {
        margin-right: 8px;

        .x-circle {
          color: ${vars.red};
        }
      }
    }

    .overlay-title {
      ${mixin.fontSourcesansproBold()}
      color: ${vars.grey};
      margin-bottom: 0;
    }

    .overlay-content {
      transition: visibility 0.3s ${vars.easeOutCubic}, opacity 0.3s ${vars.easeOutCubic}, transform 0.3s ${
    vars.easeOutCubic
  };
      box-shadow: 0 8px 20px ${rgba(vars.black, 0.2)};
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      background-color: ${vars.white};
      width: calc(100vw - (15px * 2));
      height: calc(100vh - (15px * 2));
      max-width: ${vars.maxWidth};
      padding: 20px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .overlay-header {

    }

    .overlay-body {
      flex: 1;
    }

    .overlay-cancel {
      cursor: pointer;

      &:hover {
        svg {
          color: ${vars.greyLight};
        }
      }
    }
  `;
};

interface OverlayProps {
  className?: string;
  children?: React.ReactNode;
  title: string;
  titleIcon?: React.ReactNode;
}

interface OverlayAdressBookProps extends OverlayProps {
  addressBook: AddressBook;
}

interface OverlayYoutubeProps extends OverlayProps {
  youtubeId: string;
}

export const Overlay = styled(({ className, children, title, titleIcon, ...props }: OverlayProps) => {
  useLockBodyScroll();
  const { isOverlayVisible, setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <div className={`overlay ${className}`} {...props}>
      <div className="overlay-bg" onClick={handleCloseOverlay} />
      <CSSTransition in={isOverlayVisible} timeout={300} classNames="fadescale" appear>
        <div className="overlay-content">
          <div className="overlay-header mb-3">
            <div className="row no-gutters align-items-center">
              {titleIcon && (
                <div className="col-auto mr-1">
                  <div className="title-icon">{titleIcon}</div>
                </div>
              )}
              <div className="col">
                <h3 className="overlay-title">{title}</h3>
              </div>
              <div className="col-auto ml-auto">
                <div className="overlay-cancel" onClick={handleCloseOverlay}>
                  <SvgIcon>
                    <SvgIconX />
                  </SvgIcon>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-body">
            <div className="d-flex flex-column h-100">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
})`
  ${OverlayBaseStyle()}
`;

export const OverlayAddressBook = styled(({ addressBook = {}, ...props }: OverlayAdressBookProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTermChanged = (event: { target: { value: string } }) => {
    const inputText = event.target.value;
    setSearchTerm(inputText);
  };

  return (
    <Overlay className="address-book" {...props}>
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
      <div className="table-responsive overlay-table-responsive">
        <table className="table overlay-table">
          <thead className="overlay-table-thead">
            <tr>
              <th>Name</th>
              <td>ID</td>
            </tr>
          </thead>
          <tbody className="overlay-table-tbody">
            {isEmpty(addressBook) ? (
              <tr className="text-center p-2">
                <td className="border-0">No Address found.</td>
              </tr>
            ) : (
              Object.keys(addressBook).map((key) => {
                const name = addressBook[key];
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
    </Overlay>
  );
})`
  ${OverlayBaseStyle()}
  .overlay-content {
    max-width: 760px;
    max-height: 600px;
  }

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

  .overlay-table-responsive {
    border: solid 1px ${vars.greyLight};
  }

  .overlay-table {
    width: 100%;
    margin-bottom: 0;

    tr {
      display: flex;
      flex-direction: row;
      width: 100%;
    }

    th {
      flex: 0 1 180px;
      min-width: 180px;
    }

    td {
      flex: 1 0 auto;
    }

    .overlay-table-thead {
      th,
      td {
        border: none;
      }
    }
  }

  .overlay-table-thead {
    color: ${vars.white};
    background-color: ${vars.brandNavy};
  }

  .overlay-table-tbody {
    display: block;
    height: 360px;
    overflow: auto;

    tr {
      &:nth-of-type(even) {
        background-color: ${vars.blueLighter};
      }
    }
  }
`;

export const OverlayYoutube = styled(({ youtubeId, ...props }: OverlayYoutubeProps) => {
  return (
    <Overlay {...props}>
      <div className="video">
        <iframe title={youtubeId} src={`https://www.youtube.com/embed/${youtubeId}?rel=0`} />
      </div>
    </Overlay>
  );
})`
  ${OverlayBaseStyle()}

  .overlay-content {
    height: auto;
  }

  .video {
    ${mixin.aspectRatio(16, 9)}

    > iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
    }
  }
`;

export const OverlayMessagePromptNoMetamask = styled(({ ...props }) => {
  return (
    <Overlay {...props}>
      <div className="flex-fill">
        <p>Oops! It seems like you have not installed the Metamask extension.</p>
        <p>You would need to install it before proceeding.</p>
      </div>
      <div className="row no-gutters">
        <div className="col-auto ml-auto">
          <AnchorLinkButtonSolidOrangeWhite
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Metamask
          </AnchorLinkButtonSolidOrangeWhite>
        </div>
      </div>
    </Overlay>
  );
})`
  ${OverlayBaseStyle()}

  .overlay-content {
    max-width: 400px;
    max-height: 240px;
  }

  .overlay-title {
    ${mixin.fontSize(26)};
  }
`;

export const OverlayMessagePromptNoManageAccess = styled(({ ...props }) => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <Overlay {...props}>
      <div className="flex-fill">
        <p>Oops! It seems like you do not have access to manage assets.</p>
      </div>
      <div className="row no-gutters">
        <div className="col-auto ml-auto">
          <ButtonSolidOrangeWhite onClick={handleCloseOverlay}>Close</ButtonSolidOrangeWhite>
        </div>
      </div>
    </Overlay>
  );
})`
  ${OverlayBaseStyle()}

  .overlay-content {
    max-width: 400px;
    max-height: 240px;
  }

  .overlay-title {
    ${mixin.fontSize(26)};
  }
`;
