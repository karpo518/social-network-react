import { connect } from "react-redux";
import { follow, unfollow, loadUsers, usersAC } from "../../redux/users-reducer";
import Users from "./Users";
import { Component, ComponentType } from "react";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getIsFriend, getTerm } from "../../redux/users-selectors";
import { TUser } from "../../types/types";
import { TAppState } from "../../redux/redux-store";

type TMapStateProps = {
  users: Array<TUser>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  isFriend: 0 | 1 | 2
  term: string | null
}

type TMapDispatchProps = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void
  loadUsers: (currentPage: number, pageSize: number, isFriend: 0 | 1 | 2, term: string | null) => void
  setIsFriend: (isFriend: 0 | 1 | 2) => void
  setTerm: (term: string | null) => void
}

type TMapOwnProps = {
  pageTitle: string
}

type TProps = TMapStateProps & TMapDispatchProps & TMapOwnProps

class UsersContainer extends Component<TProps> {
  componentDidMount = () => {
    let {currentPage, pageSize, isFriend, term} = this.props

    if(currentPage !== 1) {
      this.props.setCurrentPage(1)
    }
    else {
      this.props.loadUsers(currentPage, pageSize, isFriend, term)
    }
  };

  componentDidUpdate(prevProps: TProps) {
        
    if (prevProps.currentPage !== this.props.currentPage ||
        prevProps.isFriend !== this.props.isFriend ||
        prevProps.term !== this.props.term
      ) {

      this.props.loadUsers(this.props.currentPage, this.props.pageSize, this.props.isFriend, this.props.term);
    }
  }

  onPageChanged = (pageNumber: number) => {
        
      this.props.setCurrentPage(pageNumber);
  }

  render() {

    
    return (
      <>
        <h2>{this.props.pageTitle}</h2>
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          isFetching={this.props.isFetching}
          followingInProgress={this.props.followingInProgress}
          setIsFriend={this.props.setIsFriend}
          setTerm={this.props.setTerm}
          users={this.props.users}
          isFriend={this.props.isFriend}
          term={this.props.term}
        />
      </>
    );
  }
}

let mapStateToProps = (state: TAppState): TMapStateProps => {
  return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state), 
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
      isFriend: getIsFriend(state),
      term: getTerm(state)
  };
}

let dispatchProps = {
    follow,
    unfollow,
    setCurrentPage: usersAC.setCurrentPage,
    loadUsers,
    setIsFriend: usersAC.setIsFriend,
    setTerm: usersAC.setTerm,
}

export default compose<ComponentType<TMapOwnProps>>(
  connect<TMapStateProps, TMapDispatchProps, TMapOwnProps, TAppState>(mapStateToProps, dispatchProps),
)(UsersContainer)