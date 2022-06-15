import { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, InputArea } from "../common/FormControls/FormControls";
import s from "./Login.module.css";

type TProps = {
  isAuth: boolean
  captchaUrl: string | null
  login: (formData: any) => void
  updateCaptchaUrl: () => void
}

const Login: FC<TProps> = ({isAuth, captchaUrl, login, updateCaptchaUrl}) => {
  const onSubmit = (formData: TFormData) => {
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

export type TFormData = {
  email: string
  password: string
  rememberMe: boolean
  apiKey: string
  captcha?: string
}

type TOwnProps = {
  captchaUrl: string | null
  updateCaptchaUrl: () => void
  onSubmit: (formData: any) => void
}

type TFormProps = TOwnProps & InjectedFormProps<TFormData,TOwnProps>

const LoginForm: FC<TFormProps> = (props) => {
    return (
    <form onSubmit={props.handleSubmit} className={s.form}>

      { createField<TFormData>('E-mail', 'email', [required], InputArea, {type: 'text', fieldType: 'input'}) }
      { createField<TFormData>('Password', 'password', [required], InputArea, {type: 'password', fieldType: 'input'}) }
      { createField<TFormData>('API key', 'apiKey', [required], InputArea, {type: 'text', fieldType: 'input'}) }

      { 
        props.captchaUrl && 
        ( <div>
            <div className={s.fieldContent}>
                <img onClick={props.updateCaptchaUrl} src={props.captchaUrl} alt={'captcha text'} />
            </div>
            <div className={s.fieldControl} >
                { createField<TFormData>('Image text', 'captcha', [required], InputArea, {type: 'text', fieldType: 'input'}) }
            </div>
        </div> )
      }
      <div>

        { createField<TFormData>(null, 'rememberMe', [], InputArea, {type: 'checkbox', fieldType: 'input', label: 'Remember me', 'id': 'rememberMe' }) }

      </div>
      {props.error && <div className={s.errors} > {props.error}</div>}
      <div>
        <button className={s.submit}>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<TFormData,TOwnProps>({ form: "login" })(LoginForm);

export default Login;
