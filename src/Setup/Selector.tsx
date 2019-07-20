import React from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

interface Props {
  code: string;
  name: string;
  onSelect: Function;
  onDeselect: Function;
}

const SelectorCss = css`
  display: block;
  padding: 0 0 5px 0;
`;

const Selector: React.FC<Props> = ({ code, name, onSelect, onDeselect }) => {
  return (
    <label css={SelectorCss}>
      <input
        type="checkbox"
        value={code}
        name={code}
        onChange={e => {
          if (e.target.checked) {
            onSelect(code);
          } else {
            onDeselect(code);
          }
        }}
      />
      {name}
    </label>
  );
};

export default Selector;
