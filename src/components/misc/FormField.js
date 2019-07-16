import React from "react";

const FormField = props => {
  const {
    label,
    name,
    onBlur,
    value,
    onChange,
    touch,
    error,
    type,
    validationClassName,
    disabled
  } = props;

  const inputAttrs = {
    autoComplete: "off",
    className: `form-control ${validationClassName}`,
    name,
    value,
    onBlur,
    onChange: onChange,
    type,
    disabled
  };

  return (
    <div className="form-group">
      <label>{label}</label>

      {type === "textarea" ? (
        <textarea {...inputAttrs} rows={7} />
      ) : (
        <input {...inputAttrs} />
      )}

      {touch && !error && <div className="valid-feedback">Looks good!</div>}

      {touch && error && <div className="invalid-feedback">Invalid field</div>}
    </div>
  );
};

export default FormField;
