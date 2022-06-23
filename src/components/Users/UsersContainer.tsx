import { connect } from "react-redux";
import { follow, unfollow, loadUsers, usersAC, TIsFriend } from "../../redux/users-reducer";
import Users from "./Users";
import { ComponentType, FC, useEffect } from "react";
import { compose } from "redux";
import { getUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getIsFriend, getTerm } from "../../redux/users-selectors";
import { TUser } from "../../types/types";
import { TAppState } from "../../redux/redux-store";
import usePrevious from "../../utils/hooks/usePrevious";

type TMapStateProps = {
  users: Array<TUser>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
  isFriend: 0 | 1 | 2
  term: string
}

type TMapDispatchProps = {
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setCurrentPage: (pageNumber: number) => void
  loadUsers: (currentPage: number, pageSize: number, isFriend: 0 | 1 | 2, term: string | null) => void
  setIsFriend: (isFriend: 0 | 1 | 2) => void
  setTerm: (term: string) => void
}

type TMapOwnProps = {
  pageTitle: string
}


type TProps = TMapStateProps & TMapDispatchProps & TMapOwnProps

const UsersContainer:FC<TProps> = (props) => {

  const {currentPage, pageSize, isFriend, term, loadUsers, setCurrentPage} = props

  const prevIsFriend = usePrevious<TIsFriend>(props.isFriend) || props.isFriend
  const prevTerm = usePrevious<string>(props.term) || props.term

  const page = (prevIsFriend !== isFriend || prevTerm !== term) ? 1 : currentPage
    
  useEffect(() => {

    if(currentPage !== page) {
      setCurrentPage(1)
    }

    loadUsers(currentPage, pageSize, isFriend, term)

  },[currentPage, pageSize, isFriend, term, loadUsers, page, setCurrentPage])


  const onPageChanged = (pageNumber: number) => {
        
      props.setCurrentPage(pageNumber);
  }

  return (
      <>
        <h2>{props.pageTitle}</h2>
        <Users
          totalUsersCount={props.totalUsersCount}
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          onPageChanged={onPageChanged}
          follow={props.follow}
          unfollow={props.unfollow}
          isFetching={props.isFetching}
          followingInProgress={props.followingInProgress}
          setIsFriend={props.setIsFriend}
          setTerm={props.setTerm}
          users={props.users}
          isFriend={props.isFriend}
          term={props.term}
        />
      </>
    );
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
    loadUsers: loadUsers,
    setIsFriend: usersAC.setIsFriend,
    setTerm: usersAC.setTerm,
}

export default compose<ComponentType<TMapOwnProps>>(
  connect<TMapStateProps, TMapDispatchProps, TMapOwnProps, TAppState>(mapStateToProps, dispatchProps),
)(UsersContainer)