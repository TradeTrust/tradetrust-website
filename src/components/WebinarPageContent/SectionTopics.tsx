import React from "react";
import styled from "@emotion/styled";
import { SvgIcon, SvgIconChecked } from "./../UI/SvgIcon";
import { mixin, vars } from "../../styles";
import { RegisterButton } from "./RegisterButton";

interface SectionTopicsProps {
  className?: string;
}

export const SectionTopicsUnStyled = ({ className }: SectionTopicsProps) => {
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-lg-5">
            <h2>If you are interested in selected topics only:</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">
                      <div className="cell-pad">Topics of Interest / Webinar</div>
                    </th>
                    <th scope="col">
                      <div className="cell-pad">2</div>
                    </th>
                    <th scope="col">
                      <div className="cell-pad">3</div>
                    </th>
                    <th scope="col">
                      <div className="cell-pad">4</div>
                    </th>
                    <th scope="col">
                      <div className="cell-pad">5</div>
                    </th>
                    <th scope="col">
                      <div className="cell-pad">6</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <div className="cell-pad">Verifiable Documents</div>
                    </th>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td>&nbsp;</td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="cell-pad">Transferable Documents</div>
                    </th>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="cell-pad">Configure and Change Document Templates</div>
                    </th>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="checked">
                      <div className="cell-pad">
                        <SvgIcon>
                          <SvgIconChecked />
                        </SvgIcon>
                      </div>
                    </td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <div className="cell-pad">Identity Resolution Services</div>
                    </th>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td className="checked">
                      <div className="cell-pad">
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
        <div className="row">
          <div className="col-12">
            <p>
              Reserve your slot(s) by simply clicking on ‘Register Now’ or at this{" "}
              <a href="https://form.gov.sg/#!/5ef05be8e4f89f001195ef4c" target="_blank" rel="noreferrer noopener">
                link
              </a>{" "}
              and select the session(s) you wish to attend. The webinar and details will be sent to registered
              participants closer to the webinar date. You may reserve all six sessions in one registration or choose to
              register individually.
            </p>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-auto mx-auto">
            <RegisterButton>Register Now</RegisterButton>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 mx-lg-auto">
            <div className="bg-blue">
              <p className="mb-0">
                For enquiries, email us at <a href="mailto:tradetrust@imda.gov.sg">tradetrust@imda.gov.sg</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SectionTopics = styled(SectionTopicsUnStyled)`
  padding: 15px 0 60px;

  h2 {
    ${mixin.fontSourcesansproSemibold};
    text-transform: uppercase;
    color: ${vars.brandOrange};
    line-height: 1.1;
  }

  .cell-pad {
    padding: 10px;
  }

  .bg-blue {
    text-align: center;
    background-color: ${vars.blue};
    color: ${vars.white};
    ${mixin.fontSourcesansproSemibold};
    padding: 10px 15px;

    a {
      color: ${vars.white};
      ${mixin.fontSourcesansproBold};
    }
  }

  .table {
    th,
    td {
      padding: 0;
      vertical-align: middle;
      background-color: #d0ecf6;
      border: 4px solid ${vars.white};
    }

    td {
      text-align: center;
    }

    thead {
      th {
        &:nth-of-type(1) {
          text-transform: uppercase;
        }

        &:not(:nth-of-type(1)) {
          text-align: center;
        }
      }
    }

    tbody {
    }

    .checked {
      background-color: ${vars.brandOrange};

      polyline {
        color: ${vars.white};
        stroke-width: 4px;
      }
    }
  }
`;
