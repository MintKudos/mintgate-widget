import React from "react";

const TextInput = ({ type = "text", value, onChange }) => (
  <div>
    <label>Hello there!</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
    />
  </div>
);

export default TextInput;