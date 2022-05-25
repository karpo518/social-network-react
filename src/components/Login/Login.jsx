import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { createField, InputArea } from "../common/FormControls/FormControls";
import s from "./Login.module.css";

const LoginForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit} className={s.form}>

      { createField('E-mail', 'email', [required], InputArea, {type: 'text', fieldType: 'input'}) }
      { createField('Password', 'password', [required], InputArea, {type: 'password', fieldType: 'input'}) }

      { 
        !props.captchaUrl || 
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

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = ({isAuth,captchaUrl, login, updateCaptchaUrl}) => {
  const onSubmit = (formData) => {
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

export default Login;
