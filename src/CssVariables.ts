import { conditionalExpression } from "@babel/types";
import { css } from "@emotion/core";

export const Color = {
  white: "#fff",
  linen: "#FAF0E8",
  light: "#B8D8D8",
  dark: "#083D77",
  asparagus: "#73A66B"
};

export const Universal = css`
  body {
    background: ${Color.linen};
  }
  * {
    box-sizing: "border-box";
  }
  fieldset {
    border-radius: "10px";
    display: "block";
    border: 1px solid ${Color.dark};
    margin: "0 0 20px";
    padding: "20px";
  }
  legend {
    font-weight: "bold";
  }
  label {
    padding: "0 15px 0 0";
  }
  button {
    display: "inline-block";
    -webkit-appearance: "none";
    -moz-appearance: "none";
    padding: "10px 15px";
    background: Color.asparagus;
    border-radius: "5px";
    border: "1px solid transparent";
    color: ${Color.white};
    font-weight: "bold";
    font-size: "14px";
    cursor: "pointer";
  }
`;
