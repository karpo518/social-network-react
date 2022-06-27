import { InferValueTypes, TBaseThunk } from './redux-store';
import { TUser, TValueOf } from './../types/types';
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { Dispatch } from 'redux';
import { TResponse } from '../api/api';
import { AxiosResponse } from 'axios';

// action types of usersReduser
export const usersAT =
{
    FOLLOW: 'MY-APP/USERS/FOLLOW' as const,
    UNFOLLOW: 'MY-APP/USERS/UNFOLLOW' as const,
    SET_USERS: 'MY-APP/USERS/SET_USERS' as const,
    SET_CURRENT_PAGE: 'MY-APP/USERS/SET_CURRENT_PAGE' as const,
    SET_TOTAL_USERS_COUNT: 'MY-APP/USERS/SET_TOTAL_USERS_COUNT' as const,
    TOGGLE_IS_FETCHING: 'MY-APP/USERS/TOGGLE_IS_FETCHING' as const,
    TOGGLE_IS_FOLLOWING_IN_PROGRESS: 'MY-APP/USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS' as const,
    SET_FILTER: 'MY-APP/USERS/SET_FILTER' as const,
}

export const friendsOnly = {
    Yes: 'yes' as const,
    No: 'no' as const,
    Any: 'any' as const
}

export type TIsFriend =  TValueOf<typeof friendsOnly>

export type TFilter = {
    isFriend: TIsFriend,
    term: string
}

let initialState = {
    users: [] as Array<TUser>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of user ids
    filter: {
        isFriend: friendsOnly.Any,
        term: '',
    } as TFilter
    
};

export type TUsersState = typeof initialState

const usersReducer = (state: TUsersState = initialState, action: TUsersActions): TUsersState => {
    
    switch(action.type) {
        case usersAT.FOLLOW:
            return {
                ...state, 
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: true}),
            };

        case usersAT.UNFOLLOW:

            return {
                ...state, 
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: false}),
            };

        case usersAT.SET_USERS: { 
            return {...state, users: [...action.users] };
        }
        case usersAT.SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage };
        }
        case usersAT.SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount };
        }
        case usersAT.TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching };
        }
        case usersAT.TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            
            return {...state, 
                    followingInProgress: action.isFollowingInProgress 
                        ? [...state.followingInProgress, action.userId] 
                        : state.followingInProgress.filter(id => id !== action.userId) };
        }
        case usersAT.SET_FILTER: {
            return {...state, filter: action.payload };
        }

        default:
            return {...state};

    }
};

export type TUsersActions = ReturnType<InferValueTypes<typeof usersAC>>


export const usersAC = {

    followSuccess: (userId: number) => ({ type: usersAT.FOLLOW, userId: userId }),
    unfollowSuccess: (userId: number) => ({ type: usersAT.UNFOLLOW, userId: userId }),
    setUsers: (users: Array<TUser>) => ({ type: usersAT.SET_USERS, users: [...users] }),
    setCurrentPage: (currentPage: number) => ({ type: usersAT.SET_CURRENT_PAGE, currentPage: currentPage }),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: usersAT.SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount }),
    toggleIsFetching: (isFetching: boolean) => ({ type: usersAT.TOGGLE_IS_FETCHING, isFetching: isFetching }),
    toggleIsFollowingInProgress: (isFollowingInProgress: boolean, userId: number) => 
        ({ type: usersAT.TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFollowingInProgress, userId }),
    setFilter: (payload: TFilter) => ({ type: usersAT.SET_FILTER, payload }),
}

type DispatchType = Dispatch<TUsersActions>

export const loadUsers = (currentPage: number, 
                          pageSize: number,
                          isFriend: TIsFriend = friendsOnly.Any,
                          term: string = ''): TBaseThunk<TUsersActions> => {
    return async (dispatch) => {

        dispatch(usersAC.toggleIsFetching(true));
        // dispatch(usersAC.setCurrentPage(currentPage));
        // dispatch(usersAC.setFilter({term: term, isFriend: isFriend}));
        let response = await usersAPI.getUsers(currentPage, pageSize, isFriend, term) 
        dispatch(usersAC.toggleIsFetching(false));
        dispatch(usersAC.setUsers(response.data.items));
        dispatch(usersAC.setTotalUsersCount(response.data.totalCount));

    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, 
                                   userId: number, 
                                   apiMethod: (userId: number) => Promise<AxiosResponse<TResponse>>, 
                                   successAC: (userId: number) => ReturnType<typeof usersAC.followSuccess | typeof usersAC.unfollowSuccess>) => {

    dispatch(usersAC.toggleIsFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(successAC(userId));
    }
    dispatch(usersAC.toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId: number): TBaseThunk<TUsersActions> => {
    return async (dispatch: any) => {

      _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), usersAC.followSuccess)
    }
}

export const unfollow = (userId: number): TBaseThunk<TUsersActions> => {
    return async (dispatch: any) => {

       _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), usersAC.unfollowSuccess)
    }
}

export default usersReducer;