import {logout} from '../../redux/auth-reducer';
import Header from './Header';
import { Component } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';

type statePropsType = {
  isAuth: boolean
  login: string | null
  photoUrl: string | null
  isFetching: boolean
}

type dispatchPropsType = {
  logout: () => void
}

type ownPropsType = {}

type ownFunctionsType = {}

export type PropsType = ownPropsType & statePropsType & dispatchPropsType

class HeaderContainer extends Component<PropsType> {
  componentDidMount = () => {
    // this.props.getAuthUserData();
  };

  render() {
    
    return (
      <>
      { this.props.isFetching ? <div className={'test'}><Preloader /></div> : <Header {...this.props} />  }
      </>
    );
  }
}

let mapStateToProps: MapStateToProps<statePropsType, ownPropsType, AppStateType> = (state, props)=> {
  return {
    isAuth: state.auth.isAuth, 
    login: state.auth.login, 
    photoUrl: state.auth.photoUrl,
    isFetching: state.auth.isFetching,
  }
}

let mapDispatchToProps: MapDispatchToProps<dispatchPropsType, ownFunctionsType> = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps) (HeaderContainer);