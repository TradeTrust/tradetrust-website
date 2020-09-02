import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { lighten } from "polished";

export const ViewerContainer = styled.div`
  text-align: center;
  padding: 24px;
  justify-content: center;
  flex-direction: column;
  display: flex;
  border-radius: 10px;
  min-height: 400px;

  @media only screen and (min-width: ${vars.lg}) {
    min-height: 600px;
  }

  &.default {
    ${mixin.dropzoneStatus({ bg: vars.blueLightest, borderColor: vars.brandBlue })}
  }

  &.accept {
    ${mixin.dropzoneStatus({ bg: vars.greenLightest, borderColor: vars.brandBlue })}
  }

  &.warning {
    ${mixin.dropzoneStatus({ bg: lighten(0.25, vars.warning), borderColor: vars.brandBlue })}
    color: ${vars.warning};

    .unverified-btn {
      ${mixin.button({
        bg: vars.warning,
        bgHover: lighten(0.05, vars.warning),
        color: vars.white,
        borderColor: vars.warning,
      })}
    }
  }

  &.invalid {
    ${mixin.dropzoneStatus({ bg: lighten(0.25, vars.invalid), borderColor: vars.invalid })}
    color: ${vars.invalid};

    .unverified-btn {
      ${mixin.button({
        bg: vars.invalid,
        bgHover: lighten(0.05, vars.invalid),
        color: vars.white,
        borderColor: vars.invalid,
      })}
    }
  }

  .unverified-btn-container {
    margin: auto;
    text-decoration: none;

    a {
      &:hover {
        text-decoration: none;
      }
    }
  }

  .image-container {
    margin-bottom: 16px;

    img {
      height: 110px;
    }
  }

  .message-container {
    margin-top: 24px;
    margin-bottom: 8px;
    color: ${vars.black};

    span {
      vertical-align: middle;
    }
  }

  .verifications {
    margin-bottom: 32px;

    .messages {
      ${mixin.fontSourcesansproBold}
      ${mixin.fontSize(18)}
      margin-bottom: 0;
    }
  }

  .secondary-links {
    width: 50%;
    display: flex;
    margin: 16px auto 0;

    span {
      margin: auto;

      a {
        ${mixin.fontSize(14)}
      }
    }
  }

  .text-link {
    color: $color-grey;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${vars.brandNavy};
    }
  }
`;

export const ViewerButton = styled.button`
  ${mixin.button({
    bg: vars.white,
    bgHover: vars.brandBlue,
    color: vars.brandBlue,
    colorHover: vars.white,
    borderColor: vars.brandBlue,
  })}
  margin: 0 10px 10px;
`;
