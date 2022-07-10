import { Checkbox, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Component, FC } from 'react';
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import { NestedKeyOf } from '../../../types/types';
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
  return (
    <div className={s.formControl + " " + (hasError ? s.error : "")}>
      {props.label && props.type !== "checkbox" && (
        <div className={`${s.labelTextWrap}`}>
          <label htmlFor={props.id || ""}>{props.label}</label>
        </div>
      )}
      
      <div className={s.fieldWrap}>
        {fieldType === "input" 
         ? props.type === "checkbox" 
              ? <Checkbox  {...input} {...props} >{props.label}</Checkbox> 
              : <Input {...input} {...props} />
         : (
          <TextArea {...input} {...props} />
        )}
      </div>

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
