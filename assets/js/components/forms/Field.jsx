import React from "react";

const Field = ({
  label,
  name,
  placeholder = "Votre " + name,
  type = "text",
  value,
  onChange,
  error = ""
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={"form-control" + (error && " is-invalid")}
        type={type}
      />
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default Field;
