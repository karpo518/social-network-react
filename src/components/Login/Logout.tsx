import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { FC } from "react";
import { Navigate } from "react-router-dom";

type TProps = {
  logout: () => void
}


const Logout: FC<TProps> = (props) => {
  props.logout()
  return <Navigate to={'/login'} />

};

export default compose(
  withAuthRedirect
)(Logout)
