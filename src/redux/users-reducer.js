import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

/*
        { id: 1, followed: false, fullName: 'Dmitry', status: 'I am boss', location: {city: 'Minsk', country: 'Belarus'},  photoUrl: 'https://i.pinimg.com/originals/63/97/51/639751f479935519929d41df4994e0d4.jpg' },
        { id: 2, followed: true, fullName: 'Sasha', status: 'I am boss too', location: {city: 'Moscow', country: 'Russia'}, photoUrl: 'https://lemanagement.se/wp-content/uploads/2017/12/1485175881mlkcl9q.jpg' },
        { id: 3, followed: false, fullName: 'Andrew', status: 'I am boss too', location: {city: 'Kiev', country: 'Ukraine'}, photoUrl: 'https://www.bellazon.com/main/uploads/monthly_03_2014/post-20217-0-1446113692-29693_thumb.jpg' },
*/

let initialState = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    
    
    
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

export const followSuccess = (userId) => ({type: FOLLOW, userId: userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users: [...users]});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching: isFetching});
export const toggleIsFollowingInProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId});

export const loadUsers = (currentPage,pageSize) => {
    return async (dispatch) => {

        dispatch(toggleIsFetching(true));
        let response = await usersAPI.getUsers(currentPage, pageSize) 
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));

    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, successAC) => {

    dispatch(toggleIsFollowingInProgress(true, userId));
    let response = await apiMethod(userId)
    if(response.data.resultCode === 0) {
        dispatch(successAC(userId));
    }
    dispatch(toggleIsFollowingInProgress(false, userId));
}

export const follow = (userId) => {
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {

        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;