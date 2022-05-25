import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input, InputArea } from "../common/FormControls/FormControls";
import s from "./Login.module.css";
import { logout } from "../../redux/auth-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const Logout = (props) => {
  props.logout()
  return (
    <></>
  );
};

export default compose(
  connect(null, {logout}),
  withAuthRedirect
)(Logout)
