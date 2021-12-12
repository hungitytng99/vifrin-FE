import ErrorMessage from "components/ErrorMessage/ErrorMessage";
import PropTypes from "prop-types";
import React from "react";
import { FormGroup } from "reactstrap";
import "./InputField.scss";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  label: "",
  placeholder: "",
  disabled: false,
};

function InputField(props) {
  const { field, form, type, label, placeholder, disabled } = props;
  const { name } = field;
  const { errors, touched } = form;
  return (
    <FormGroup>
      <div className="field">
        {label && (
          <label className="field-label" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          className="field-input"
          id={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          {...field}
        />
        <ErrorMessage errors={errors} touched={touched} name={name} />
      </div>
    </FormGroup>
  );
}

export default InputField;
