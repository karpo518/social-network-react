import { Component, FC } from 'react';
import { CommonFieldProps, Field, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import { NestedKeyOf, TValueOf } from '../../../types/types';
import { FieldValidatorType } from "../../../utils/validators/validators";
import s from "./FormControls.module.css";

type PropsType = {
  input: WrappedFieldInputProps
  meta: WrappedFieldMetaProps
  fieldType: string
  id?: string
  label?: string 
  type: 'textarea' | 'input' | 'checkbox' 
}

export const InputArea: FC<PropsType> = ({ input, meta: {touched, error}, fieldType, ...props }) => {
  const hasError = touched && error;
  console.log('input var:')
  console.log(input)
  console.log('props var:')
  console.log(props)
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      {props.label && props.type !== "checkbox" && (
        <div className={`${s.labelTextWrap}`}>
          <label htmlFor={props.id || ""}>{props.label}</label>
        </div>
      )}
      
      <div className={s.fieldWrap}>
        {fieldType === "input" ? (
          <input {...input} {...props} />
        ) : (
          <textarea {...input} {...props} />
        )}
      </div>
      {props.label && props.type === "checkbox" && (
        <div className={s.labelCheckboxWrap}>
          <label htmlFor={props.id || ""}>{props.label}</label>
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

export function  createField<TFormData extends object>(
  placeholder: string | null,
  name: NestedKeyOf<TFormData>,
  validators: Array<FieldValidatorType>,
  component: string | Component<any,any,any> | FC<any>,
  props: any
)
{
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
