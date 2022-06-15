import { Component } from "react";
import { connect } from "react-redux";
import { login, updateCaptchaUrl } from "../../redux/auth-reducer";
import { compose } from "redux";
import Login from "./Login";
import { TAppState } from "../../redux/redux-store";

type TMapStateProps = {
  isAuth: boolean,
  captchaUrl: string | null
}

type TMapDispatchProps = {
  login: (formData: any) => void
  updateCaptchaUrl: () => void
}

type TMapOwnProps = {
}

type TProps = TMapStateProps & TMapDispatchProps & TMapOwnProps

class LoginContainer extends Component<TProps> {
  
  render () {

    return (
      <>
        <Login isAuth={this.props.isAuth} captchaUrl={this.props.captchaUrl} login={this.props.login} updateCaptchaUrl={this.props.updateCaptchaUrl} />
      </>
    );
  };
}

let mapStateToProps = (state: TAppState): TMapStateProps => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default compose(
  connect<TMapStateProps, TMapDispatchProps, TMapOwnProps, TAppState>(mapStateToProps, {login,updateCaptchaUrl}),
)(LoginContainer)
