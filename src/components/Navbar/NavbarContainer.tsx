import { connect } from 'react-redux';
import { TAppState } from '../../redux/redux-store';
import { TFriend } from '../../types/types';
import Navbar from './Navbar';

type MapStatePropsType = {
  friends: Array<TFriend>
}

let mapStateToProps = (state: TAppState):MapStatePropsType => {
  return { friends: state.sidebar.friends };
};

const NavbarContainer = connect<MapStatePropsType, {}, {}, TAppState>(mapStateToProps, {}) (Navbar);

export default NavbarContainer;
