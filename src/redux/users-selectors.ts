import { TAppState } from './redux-store';
import { createSelector } from 'reselect'

export const getUsersSelector = (state: TAppState) => {
    return  state.usersPage.users;
}

export const getUsers = createSelector([getUsersSelector], (users) => {
    return  users.filter(u => true);
})

export const getPageSize = (state: TAppState) => {
    return  state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: TAppState) => {
    return  state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: TAppState) => {
    return  state.usersPage.currentPage;
}

export const getIsFetching = (state: TAppState) => {
    return  state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: TAppState) => {
    return  state.usersPage.followingInProgress;
}

export const getFilter = (state: TAppState) => {
    return  state.usersPage.filter;
}