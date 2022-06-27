import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { ThunkDispatch } from "redux-thunk";
import { login, TAuthActions, updateCaptchaUrl } from "../../redux/auth-reducer";
import { TAppState } from "../../redux/redux-store";
import { required } from "../../utils/validators/validators";
import { createField, InputArea } from "../common/FormControls/FormControls";
import s from "./Login.module.css";


export const LoginPage: FC = () => {
  
  const captchaUrl = useSelector((state: TAppState) => state.auth.captchaUrl)
  const isAuth = useSelector((state: TAppState) => state.auth.isAuth)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TAuthActions>>()

  const onUpdateCaptchaUrl = () => {
    dispatch(updateCaptchaUrl)
  }

  const onSubmit = (formData: TFormData) => {
    dispatch(login(formData))
  };

  return (
    <div>
      <h1>Login</h1>
      {isAuth ? (
        <div>You are logged in already!</div>
      ) : (
        <LoginReduxForm captchaUrl={captchaUrl} onUpdateCaptchaUrl={onUpdateCaptchaUrl} onSubmit={onSubmit} />
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
  onUpdateCaptchaUrl: () => void
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
                <img onClick={props.onUpdateCaptchaUrl} src={props.captchaUrl} alt={'captcha text'} />
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
