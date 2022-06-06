import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, loadUsers } from "../../redux/users-reducer";
import Users from "./Users";
import { Component } from "react";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
}

type MapDispatchPropsType = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void
  loadUsers: (currentPage: number, pageSize: number) => void
}

type MapOwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & MapOwnPropsType

class UsersContainer extends Component<PropsType> {
  componentDidMount = () => {
    let {currentPage, pageSize} = this.props

    if(currentPage !== 1) {
      this.props.setCurrentPage(1)
    }
    else {
      this.props.loadUsers(currentPage, pageSize)
    }
  };

  componentDidUpdate(prevProps: PropsType) {
        
    if (prevProps.currentPage !== this.props.currentPage) {

      this.props.loadUsers(this.props.currentPage, this.props.pageSize);
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
          users={this.props.users}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state), 
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
  };
}

let dispatchProps = {
    follow,
    unfollow,
    setCurrentPage,
    loadUsers
}

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, MapOwnPropsType, AppStateType>(mapStateToProps, dispatchProps),
)(UsersContainer)