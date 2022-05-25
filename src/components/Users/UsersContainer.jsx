import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, toggleIsFollowingInProgress, loadUsers } from "../../redux/users-reducer";
import Users from "./Users";
import React from "react";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount } from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount = () => {
    let {currentPage, pageSize} = this.props

    if(currentPage !== 1) {
      this.props.setCurrentPage(1)
    }
    else {
      this.props.loadUsers(currentPage, pageSize)
    }
  };

  componentDidUpdate(prevProps) {
        
    if (prevProps.currentPage !== this.props.currentPage) {

      this.props.loadUsers(this.props.currentPage, this.props.pageSize);
    }
  }

  onPageChanged = (pageNumber) => {
        
      this.props.setCurrentPage(pageNumber);
  }

  render() {

    
    return (
      <>
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

let mapStateToProps = (state)=> {
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
    toggleIsFollowingInProgress,
    loadUsers
}

export default compose(
  connect(mapStateToProps, dispatchProps),
)(UsersContainer)