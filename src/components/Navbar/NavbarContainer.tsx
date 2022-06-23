import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { TAppState } from '../../redux/redux-store';
import { loadFriends} from '../../redux/sidebar-reducer';
import { TUser } from '../../types/types';
import Navbar from './Navbar';

type TProps = TMapStateProps & TMapDispatchProps

const NavbarContainer: FC<TProps> = (props) => {

  const loadFriends = props.loadFriends
  
  useEffect(() => {
    loadFriends()
  }, [loadFriends]);

  return <Navbar friends={props.friends} />
}

type TMapStateProps = {
  friends: Array<TUser>
}

type TMapDispatchProps = {
  loadFriends: () => void
}

let mapStateToProps = (state: TAppState):TMapStateProps => {
  return { friends: state.sidebar.friends };
};

let mapDispatchToProps = {
  loadFriends: loadFriends,
}

export default connect<TMapStateProps, TMapDispatchProps, {}, TAppState>(mapStateToProps, mapDispatchToProps) (NavbarContainer);
