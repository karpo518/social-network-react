import { Pagination, Row } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { TAppState } from "../../redux/redux-store";
import { follow, friendsOnly, loadUsers, TFilter, TIsFriend, TUsersActions, unfollow, usersAC } from "../../redux/users-reducer";
import { getCurrentPage, getFilter, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
import { TUser } from "../../types/types";
import { useNavigateSearch } from "../../utils/hooks/useNavigateSearch";
import usePrevious from "../../utils/hooks/usePrevious";
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

  const params = useMemo(() => {
    return Object.fromEntries(searchParams.entries()) as TFilterParams
  }, [searchParams]); 

  const onPageChanged = (pageNumber: number, ) => {    
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
  
    console.log('run useEffect')
    
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

  },[filter, page, filterInited, dispatch, params, navigateSearch ])

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
      <Pagination
        defaultCurrent={1}
        total={totalUsersCount}
        defaultPageSize={pageSize}
        current={currentPage}
        onChange={onPageChanged}
        showSizeChanger={false}
        responsive={true}
      />
      {/*       <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}  onPageChanged={onPageChanged} currentPage={currentPage} /> */}
      <div>
        <Row>
          {isFetching ? (
            <Preloader />
          ) : (
            users.map((u: TUser) => {
              return (
                <User
                  key={u.id}
                  user={u}
                  onFollow={onFollow}
                  onUnfollow={onUnfollow}
                />
              );
            })
          )}
        </Row>
      </div>
    </div>
  );
};
