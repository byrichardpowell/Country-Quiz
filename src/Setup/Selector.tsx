import React from "react";

interface Props {
  code: string;
  name: string;
  onSelect: Function;
  onDeselect: Function;
}

const Selector: React.FC<Props> = ({ code, name, onSelect, onDeselect }) => {
  return (
    <label>
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
