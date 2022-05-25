import { Field } from "redux-form";
import s from "./FormControls.module.css";

export const InputArea = ({ input, meta: {touched, error}, fieldType, ...props }) => {
  const hasError = touched && error;

  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      <div className={s.fieldWrap}>
        {fieldType === "input" ? (
          <input {...input} {...props} />
        ) : (
          <textarea {...input} {...props} />
        )}
      </div>
      {props.label && (
        <div className={s.labelWrap}>
          <label for={props.id || ""}>{props.label}</label>
        </div>
      )}

      {hasError ? (
        <div className={s.errorText}>
          <span>{error}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const createField = (
  placeholder,
  name,
  validators,
  component,
  props
) => {
  let wrapClasses = props.wrapClasses || "";

  if (props.type && props.type === "checkbox") {
    wrapClasses += s.checkboxControl;
  }

  return (
    <div className={wrapClasses}>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
    </div>
  );
};
