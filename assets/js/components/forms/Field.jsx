import React from "react";

const Field = ({
  label,
  name,

  type = "text",
  value,
  onChange,
  error = "",
}) => {
  return (
    <div className="form-group">
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={"form-control" + (error && " is-invalid")}
        type={type}
        required
      />
      <label htmlFor={name} className="form-label">
        <span className="label-name">{label}</span>
      </label>
      {error && <p className="invalid-feedback">{error}</p>}
    </div>
  );
};

export default Field;
