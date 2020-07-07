import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, SvgIconChecked } from "./../UI/SvgIcon";
import { vars } from "../../styles";

interface SectionTopicsProps {
  className?: string;
}

export const SectionTopicsUnStyled = ({ className }: SectionTopicsProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-auto">
            <h2>If you are interested in selected topics only:</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">Webinar 2</th>
                      <th scope="col">Webinar 3</th>
                      <th scope="col">Webinar 4</th>
                      <th scope="col">Webinar 5</th>
                      <th scope="col">Webinar 6</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Verifiable Documents</th>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>&nbsp;</td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <th scope="row">Transferable Documents</th>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <th scope="row">Configure and Change Document Templates</th>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr>
                      <th scope="row">Identity Resolution Services</th>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>
                        <div className="checked">
                          <SvgIcon>
                            <SvgIconChecked />
                          </SvgIcon>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionTopics = styled(SectionTopicsUnStyled)`
  padding: 45px 0;

  .table {
    th,
    td {
      padding: 0;
      vertical-align: middle;
      background-color: ${vars.greyLighter};
      border: 4px solid ${vars.white};
    }

    td {
      text-align: center;
    }

    thead {
      th {
        text-align: center;
        padding: 10px;
      }
    }

    tbody {
      th {
        padding: 10px;
      }
    }

    .checked {
      background-color: ${vars.green};
      padding: 10px;

      polyline {
        color: ${vars.white};
        stroke-width: 4px;
      }
    }
  }
`;
