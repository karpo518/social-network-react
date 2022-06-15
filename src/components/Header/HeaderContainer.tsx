import {logout} from '../../redux/auth-reducer';
import Header from './Header';
import { Component } from "react";
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { TAppState } from '../../redux/redux-store';
import Preloader from '../common/Preloader/Preloader';

type TStateProps = {
  isAuth: boolean
  login: string | null
  photoUrl: string | null
  isFetching: boolean
}

type TDispatchProps = {
  logout: () => void
}

type TOwnProps = {}

type TOwnFunctions = {}

export type PropsType = TOwnProps & TStateProps & TDispatchProps

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

let mapStateToProps: MapStateToProps<TStateProps, TOwnProps, TAppState> = (state, props)=> {
  return {
    isAuth: state.auth.isAuth, 
    login: state.auth.login, 
    photoUrl: state.auth.photoUrl,
    isFetching: state.auth.isFetching,
  }
}

let mapDispatchToProps: MapDispatchToProps<TDispatchProps, TOwnFunctions> = {
    logout
}

export default connect<TStateProps, TDispatchProps, TOwnProps, TAppState>(mapStateToProps, mapDispatchToProps) (HeaderContainer);