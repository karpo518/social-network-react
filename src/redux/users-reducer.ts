import { InferValueTypes, TBaseThunk } from './redux-store';
import { TUser } from './../types/types';
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { Dispatch } from 'redux';

// action types of usersReduser
const usersAT =
{
    FOLLOW: 'MY-APP/USERS/FOLLOW' as const,
    UNFOLLOW: 'MY-APP/USERS/UNFOLLOW' as const,
    SET_USERS: 'MY-APP/USERS/SET_USERS' as const,
    SET_CURRENT_PAGE: 'MY-APP/USERS/SET_CURRENT_PAGE' as const,
    SET_TOTAL_USERS_COUNT: 'MY-APP/USERS/SET_TOTAL_USERS_COUNT' as const,
    TOGGLE_IS_FETCHING: 'MY-APP/USERS/TOGGLE_IS_FETCHING' as const,
    TOGGLE_IS_FOLLOWING_IN_PROGRESS: 'MY-APP/USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS' as const,
    SET_IS_FRIEND: 'MY-APP/USERS/SET_IS_FRIEND' as const,
    SET_TERM: 'MY-APP/USERS/SET_TERM' as const,
}

export const friendsOnly = {
    Yes: true,
    No: false,
    Any: null
}

type TFriendsOnly = InferValueTypes<typeof friendsOnly>

let initialState = {
    users: [] as Array<TUser>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // Array of user ids
    isFriend: 0 as 0 | 1 | 2,
    term: null as string | null,
    
};

type TUsersState = typeof initialState

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
                    followingInProgress: action.isFetching 
                        ? [...state.followingInProgress, action.userId] 
                        : state.followingInProgress.filter(id => id !== action.userId) };
        }
        case usersAT.SET_IS_FRIEND: {
            return {...state, isFriend: action.isFriend };
        }
        case usersAT.SET_TERM: {
            return {...state, term: action.term };
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
    toggleIsFollowingInProgress: (isFetching: boolean, userId: number) => ({ type: usersAT.TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId }),
    setIsFriend: (isFriend: 0 | 1 | 2) => ({ type: usersAT.SET_IS_FRIEND, isFriend }),
    setTerm: (term: string | null) => ({ type: usersAT.SET_TERM, term })
}

type DispatchType = Dispatch<TUsersActions>

export const loadUsers = (currentPage: number, 
                          pageSize: number,
                          isFriend: 0 | 1 | 2,
                          term: string | null): TBaseThunk<TUsersActions> => {
    return async (dispatch) => {

        dispatch(usersAC.toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize, isFriend, term) 
        dispatch(usersAC.toggleIsFetching(false));
        dispatch(usersAC.setUsers(response.data.items));
        dispatch(usersAC.setTotalUsersCount(response.data.totalCount));

    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, 
                                   userId: number, 
                                   apiMethod: any, 
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