import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { TAppState } from "../../redux/redux-store";
import { follow, loadUsers, TFilter, TUsersActions, unfollow, usersAC } from "../../redux/users-reducer";
import { getCurrentPage, getFilter, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { TUser } from "../../types/types";
import usePrevious from "../../utils/hooks/usePrevious";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";
import FilterUsersFormik from "./FilterUsersFormik";
import User from "./User";


export const UsersPage: FC = () => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const isFetching = useSelector(getIsFetching)
  const filter = useSelector(getFilter)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TUsersActions>>();

  const onPageChanged = (pageNumber: number) => {    
    // props.setCurrentPage(pageNumber);
    dispatch(usersAC.setCurrentPage(pageNumber))
  }

  const onFilterChanged = (values: TFilter) => {
    dispatch(usersAC.setFilter(values))
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  } 

  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  const prevFilter = usePrevious<TFilter>(filter) || filter

  const page = (prevFilter !== filter) ? 1 : currentPage
    
  useEffect(() => {
    
    if(currentPage !== page) {
      dispatch(usersAC.setCurrentPage(1))
    }

    dispatch(loadUsers(currentPage, 
                       pageSize, 
                       filter.isFriend, 
                       filter.term))

  },[currentPage, pageSize, page, filter, dispatch])


  return (
    <div>
      <h2>Users</h2>

      <FilterUsersFormik onFilterChanged={onFilterChanged} />

      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}  onPageChanged={onPageChanged} currentPage={currentPage} />
      <div>
        { 
          isFetching 
            ? <Preloader />
            : users.map((u: TUser) => {
                return (
                  <User
                    key={u.id}
                    user={u}
                    onFollow={onFollow}
                    onUnfollow={onUnfollow}
                  />
                );
            })
        }
      </div>
    </div>
  );
};
