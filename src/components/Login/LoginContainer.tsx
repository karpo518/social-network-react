import React, { Component } from "react";
import { connect } from "react-redux";
import { login, updateCaptchaUrl } from "../../redux/auth-reducer";
import { compose } from "redux";
import Login from "./Login";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  isAuth: boolean,
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (formData: any) => void
  updateCaptchaUrl: () => void
}

type MapOwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType

class LoginContainer extends Component<PropsType> {
  
  render () {

    return (
      <>
        <Login isAuth={this.props.isAuth} captchaUrl={this.props.captchaUrl} login={this.props.login} updateCaptchaUrl={this.props.updateCaptchaUrl} />
      </>
    );
  };
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>(mapStateToProps, {login,updateCaptchaUrl}),
)(LoginContainer)
