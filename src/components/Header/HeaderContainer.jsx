import {logout} from '../../redux/auth-reducer';
import Header from './Header';
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { connect } from 'react-redux';

class HeaderContainer extends React.Component {
  componentDidMount = () => {
    // this.props.getAuthUserData();
  };

  render() {

    
    return (
      <>
      { this.props.isFetching ? <Preloader /> : null}
      <Header {...this.props} />
      </>
    );
  }
}

let mapStateToProps = (state)=> {
  
  return {isAuth: state.auth.isAuth, login: state.auth.login};
}

export default connect(mapStateToProps, {logout}) (HeaderContainer);