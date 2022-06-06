import { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, InputArea } from "../common/FormControls/FormControls";
import s from "./Login.module.css";

type PropsType = {
  isAuth: boolean
  captchaUrl: string | null
  login: (formData: any) => void
  updateCaptchaUrl: () => void
}

const Login: FC<PropsType> = ({isAuth, captchaUrl, login, updateCaptchaUrl}) => {
  const onSubmit = (formData: any) => {
    login(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      {isAuth ? (
        <div>You are logged in already!</div>
      ) : (
        <LoginReduxForm captchaUrl={captchaUrl} updateCaptchaUrl={updateCaptchaUrl} onSubmit={onSubmit} />
      )}
    </div>
  );
};

type FormDataType = {
  email: string
  password: string
  apiKey: string
  captcha?: string
}

type OwnPropsType = {
  captchaUrl: string | null
  updateCaptchaUrl: () => void
  onSubmit: (formData: any) => void
}

type FormPropsType = OwnPropsType & InjectedFormProps<FormDataType,OwnPropsType>

const LoginForm: FC<FormPropsType> = (props) => {
    return (
    <form onSubmit={props.handleSubmit} className={s.form}>

      { createField('E-mail', 'email', [required], InputArea, {type: 'text', fieldType: 'input'}) }
      { createField('Password', 'password', [required], InputArea, {type: 'password', fieldType: 'input'}) }
      { createField('API key', 'apiKey', [required], InputArea, {type: 'text', fieldType: 'input'}) }

      { 
        props.captchaUrl && 
        ( <div>
            <div className={s.fieldContent}>
                <img onClick={props.updateCaptchaUrl} src={props.captchaUrl} alt={'captcha text'} />
            </div>
            <div className={s.fieldControl} >
                { createField('Image text', 'captcha', [required], InputArea, {type: 'text', fieldType: 'input'}) }
            </div>
        </div> )
      }
      <div>

        { createField(null, 'rememberMe', [], InputArea, {type: 'checkbox', fieldType: 'input', label: 'Remember me', 'id': 'rememberMe' }) }

      </div>
      {props.error && <div className={s.errors} > {props.error}</div>}
      <div>
        <button className={s.submit}>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType,OwnPropsType>({ form: "login" })(LoginForm);

export default Login;
