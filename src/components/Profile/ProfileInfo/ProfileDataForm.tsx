import { FC, FunctionComponent } from "react";
import { Field, InjectedFormProps } from "redux-form";
import { reduxForm } from "redux-form";
import { ContactsType, ProfileType } from "../../../types/types";
import { createField, InputArea } from "../../common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";

type FormDataType = ProfileType

type ContactsNamesType = Array<keyof ContactsType & string>

type OwnPropsType = {
  profile: ProfileType
  initialValues: ProfileType
  onSubmit: (formData: any) => void
}

type PropsType = OwnPropsType & InjectedFormProps<FormDataType,OwnPropsType>

export const ProfileDataForm: FC<PropsType> = (props) => {

  let contacts  = Object.keys(props.profile.contacts) as ContactsNamesType
  
  return (
    <form onSubmit={props.handleSubmit} className={`${s.form} ${s.profileDataForm}` }>
      <div className={s.saveDataWrap}>
        <button>Save</button>
      </div>

      {props.error && <div className={s.errors} > {props.error}</div>}

      <div className={s.fieldItem}>
      <Field name="fullName" component="input" type="text" placeholder="Full Name"/>
      </div>

      <div className={s.fieldItem}>
        { createField<FormDataType>('About me', 'aboutMe', [], InputArea, {type: 'text', fieldType: 'textarea', 'label': 'About me'}) }
      </div>

      <div className={s.fieldItem}>
      { createField<FormDataType>(null, 
                    'lookingForAJob', 
                    [], 
                    InputArea, 
                    {type: 'checkbox', fieldType: 'input', label: 'Looking for a job', 'id': 'lookingForAJob' } ) 
      }
      </div>

      <div className={s.fieldItem}>
        { createField<FormDataType>('Details', 'lookingForAJobDescription', [], InputArea, {type: 'text', fieldType: 'textarea', 'label': 'My professional skills'}) }
      </div>
      <div className={s.aboutItem}>
        <div className={s.aboutTitle}>Contacts: </div>
        <div className={s.contactList}>
          {contacts.map( (title) => {
              return (
                <div key={title} className={s.contactFieldWrap}>
                  {createField<FormDataType>(
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

const ProfileDataReduxForm = reduxForm<FormDataType,OwnPropsType>({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);

export default ProfileDataReduxForm;
