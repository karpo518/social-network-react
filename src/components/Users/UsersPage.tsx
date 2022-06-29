import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { TAppState } from "../../redux/redux-store";
import { follow, friendsOnly, loadUsers, TFilter, TIsFriend, TUsersActions, unfollow, usersAC } from "../../redux/users-reducer";
import { getCurrentPage, getFilter, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { TFriend, TUser } from "../../types/types";
import { useNavigateSearch } from "../../utils/hooks/useNavigateSearch";
import usePrevious from "../../utils/hooks/usePrevious";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";
import FilterUsersFormik from "./FilterUsersFormik";
import User from "./User";

export type TFilterParams = {isFriend?: TIsFriend, 
  term?: string,
  page?: string}

export const UsersPage: FC = () => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const isFetching = useSelector(getIsFetching)
  const filter = useSelector(getFilter)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TUsersActions>>();

  const navigateSearch = useNavigateSearch()

  const [searchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams.entries()) as TFilterParams

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
  
  let [filterInited, setFilterInited] = useState<boolean>(false)

  useEffect(() => {
  
    if(filterInited) {
      let filterParams: TFilterParams = {}

      if(filter.isFriend !== friendsOnly.Any) {
        filterParams.isFriend = filter.isFriend
      }

      if(filter.term !== '') {
        filterParams.term = filter.term
      }

      if(page !== 1) {
        filterParams.page = page.toString()
      }
      
      navigateSearch('/users', filterParams)
    }
    else {

      if(params.page) {
        
        dispatch(usersAC.setCurrentPage(Number(params.page)))
      }
      
      if(params.isFriend || params.term) {
        
        let actualFilter: TFilter = filter

        actualFilter.isFriend = params.isFriend || filter.isFriend
        
        actualFilter.term = params.term || filter.term
        
        dispatch(usersAC.setFilter(actualFilter))
      }

      setFilterInited(true)
    }

  },[filter, page, filterInited])

  useEffect(() => {
    
    if(filterInited) {
      if(currentPage !== page) {
        dispatch(usersAC.setCurrentPage(page))
      }

      dispatch(loadUsers(currentPage, 
                        pageSize, 
                        filter.isFriend, 
                        filter.term))
    }
    

  },[currentPage, pageSize, page, filter, dispatch, filterInited])


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
