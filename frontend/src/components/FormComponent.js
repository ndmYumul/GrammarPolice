import React from "react";
import "./FormComponent.css";

function FormComponent({
  type = "text",
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  required = false,
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? "form-input error" : "form-input"}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default FormComponent;
