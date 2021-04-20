import React from "react";

const TextInput = ({ type = "text", label, value, onChange }) => (
  <div>
    {label && <label>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange && onChange(e.target.value)}
    />
  </div>
);

export default TextInput;