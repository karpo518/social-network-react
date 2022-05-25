import React from "react";
import { connect } from "react-redux";
import { login, updateCaptchaUrl } from "../../redux/auth-reducer";
import { compose } from "redux";
import Login from "./Login";

class LoginContainer extends React.Component {
  
  render () {

    return (
      <>
        <Login isAuth={this.props.isAuth} captchaUrl={this.props.captchaUrl} login={this.props.login} updateCaptchaUrl={this.props.updateCaptchaUrl} />
      </>
    );
  };
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default compose(
  connect(mapStateToProps, {login,updateCaptchaUrl}),
)(LoginContainer)
