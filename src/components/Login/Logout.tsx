import { logout } from "../../redux/auth-reducer";
import { compose } from "redux";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { FC } from "react";
import { Navigate } from "react-router-dom";

type PropsType = {
  logout: () => void
}


const Logout: FC<PropsType> = (props) => {
  props.logout()
  return <Navigate to={'/login'} />

};

export default compose(
  withAuthRedirect
)(Logout)
