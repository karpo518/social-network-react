import { Button } from "antd";
import { FC } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { reduxForm } from "redux-form";
import { TContacts, TProfile } from "../../../types/types";
import { createField, InputArea } from "../../common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";

type TFormData = TProfile

type TContactsNames = Array<keyof TContacts & string>

type TOwnProps = {
  profile: TProfile
  initialValues: TProfile
  onSubmit: (formData: any) => void
}

type TProps = TOwnProps & InjectedFormProps<TFormData,TOwnProps>

export const ProfileDataForm: FC<TProps> = (props) => {

  let contacts  = Object.keys(props.profile.contacts) as TContactsNames
  
  return (
    <form onSubmit={props.handleSubmit} className={`${s.form} ${s.profileDataForm}` }>
      <div className={s.saveDataWrap}>
        <Button type="primary" htmlType="submit" >Save</Button>
      </div>

      {props.error && <div className={s.errors} > {props.error}</div>}

      <div className={s.fieldItem}>
      <Field name="fullName" component="input" type="text" placeholder="Full Name"/>
      </div>

      <div className={s.fieldItem}>
        { createField<TFormData>('About me', 'aboutMe', [], InputArea, {type: 'text', fieldType: 'textarea', 'label': 'About me'}) }
      </div>

      <div className={s.fieldItem}>
      { createField<TFormData>(null, 
                    'lookingForAJob', 
                    [], 
                    InputArea, 
                    {type: 'checkbox', fieldType: 'input', label: 'Looking for a job', 'id': 'lookingForAJob' } ) 
      }
      </div>

      <div className={s.fieldItem}>
        { createField<TFormData>('Details', 'lookingForAJobDescription', [], InputArea, {type: 'text', fieldType: 'textarea', 'label': 'My professional skills'}) }
      </div>
      <div className={s.aboutItem}>
        <div className={s.aboutTitle}>Contacts: </div>
        <div className={s.contactList}>
          {contacts.map( (title) => {
              return (
                <div key={title} className={s.contactFieldWrap}>
                  {createField<TFormData>(
                    title,
                    `contacts.${title}`,
                    [],
                    InputArea,
                    { type: "text", fieldType: "input", label: title }
                  )}
                </div>
              );
          })}
        </div>
      </div>
      


    </form>
  );
};

const ProfileDataReduxForm = reduxForm<TFormData,TOwnProps>({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);

export default ProfileDataReduxForm;
