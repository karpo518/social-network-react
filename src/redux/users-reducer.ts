import { AppStateType } from './redux-store';
import { UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'MY-APP/USERS/FOLLOW';
const UNFOLLOW = 'MY-APP/USERS/UNFOLLOW';
const SET_USERS = 'MY-APP/USERS/SET_USERS';
const SET_CURRENT_PAGE = 'MY-APP/USERS/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'MY-APP/USERS/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'MY-APP/USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'MY-APP/USERS/TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // Array of user ids
};

type initialStateType = typeof initialState

const usersReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    
    switch(action.type) {
        case FOLLOW:
            return {
                ...state, 
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: true}),
            };

        case UNFOLLOW:

            return {
                ...state, 
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: false}),
            };

        case SET_USERS: { 
            return {...state, users: [...action.users] };
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount };
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching };
        }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            
            return {...state, 
                    followingInProgress: action.isFetching 
                        ? [...state.followingInProgress, action.userId] 
                        : state.followingInProgress.filter(id => id !== action.userId) };
        }
        default:
            return {...state};

    }
};

type followSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
type unfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
type setUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type setCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type setTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type toggleIsFollowingInProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    userId: number
}

type ActionsTypes = followSuccessActionType | unfollowSuccessActionType | setUsersActionType |
    setCurrentPageActionType | setTotalUsersCountActionType | toggleIsFetchingActionType | toggleIsFollowingInProgressActionType

export const followSuccess = (userId: number): followSuccessActionType => ({type: FOLLOW, userId: userId});
export const unfollowSuccess = (userId: number): unfollowSuccessActionType => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users: Array<UserType>): setUsersActionType => ({type: SET_USERS, users: [...users]});
export const setCurrentPage = (currentPage: number): setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount});
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const toggleIsFollowingInProgress = (isFetching: boolean, userId: number): toggleIsFollowingInProgressActionType => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const loadUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {

        dispatch(toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize) 
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));

    }
}

const _followUnfollowFlow = async (dispatch: DispatchType, 
                                   userId: number, 
                                   apiMethod: any, 
                                   successAC: (userId: number) => followSuccessActionType | unfollowSuccessActionType) => {

    dispatch(toggleIsFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
        dispatch(successAC(userId));
    }
    dispatch(toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: any) => {

        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: any) => {

        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;