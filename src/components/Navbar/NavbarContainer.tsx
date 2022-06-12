import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import { TFriend } from '../../types/types';
import Navbar from './Navbar';

type MapStatePropsType = {
  friends: Array<TFriend>
}

let mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return { friends: state.sidebar.friends };
};

const NavbarContainer = connect<MapStatePropsType, {}, {}, AppStateType>(mapStateToProps, {}) (Navbar);

export default NavbarContainer;
