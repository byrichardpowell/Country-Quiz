import { css } from "@emotion/core";

export const Color = {
  white: "#fff",
  linen: "#FAF0E8",
  light: "#B8D8D8",
  dark: "#083D77",
  asparagus: "#73A66B"
};

export const Universal = css`
  html,
  body,
  #root {
    min-height: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  body {
    background: ${Color.linen};
  }
  * {
    box-sizing: border-box;
  }
  form {
    padding: 10px 0 0;
  }
  h1 {
    margin: 0;
    padding: 20px 0 0;
  }
  fieldset {
    border-radius: 10px;
    display: block;
    border: none;
    margin: 0 0 20px;
    padding: 10px 0;
  }
  legend {
    font-weight: bold;
  }
  label {
    padding: 0 15px 0 0;
  }
  input[type="search"],
  input[type="text"] {
    padding: 5px 10px;
    border: 1px solid ${Color.light};
    border-radius: 2px;
  }
  button {
    display: inline-block;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding: 10px 15px;
    background: ${Color.asparagus};
    border-radius: 5px;
    border: 1px solid transparent;
    color: ${Color.white};
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  }
  button[disabled] {
    opacity: 0.5;
    cursor: default;
  }
`;
