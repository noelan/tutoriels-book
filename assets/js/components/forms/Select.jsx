import React from "react";

const Select = ({ name, value, label, children, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <select
        className="form-control"
        value={value}
        name={name}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
