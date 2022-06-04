import {logout} from '../../redux/auth-reducer';
import Header from './Header';
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { storeType } from '../../types/types';

type statePropsType = {
  isAuth: boolean
  login: string | null
  photoUrl: string | null
}

type dispatchPropsType = {
  logout: typeof logout
}

type ownPropsType = {}

type ownFunctionsType = {}

export type propsType = ownPropsType & statePropsType & dispatchPropsType

class HeaderContainer extends React.Component {
  componentDidMount = () => {
    // this.props.getAuthUserData();
  };

  render() {

    
    return (
      <>
      { /* this.props.isFetching ? <Preloader /> : null */ }
      <Header {...this.props as propsType} />
      </>
    );
  }
}

let mapStateToProps: MapStateToProps<statePropsType, ownPropsType, storeType> = (state: storeType, props: ownPropsType)=> {
  return {
    isAuth: state.auth.isAuth, 
    login: state.auth.login, 
    photoUrl: state.auth.photoUrl
  }
}

let mapDispatchToProps: MapDispatchToProps<dispatchPropsType, ownFunctionsType> = () => {
  return {
    logout
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderContainer);