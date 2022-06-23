import { TAppState } from './redux-store';
import { createSelector } from 'reselect'

export const getFriendsSelector = (state: TAppState) => {
    return  state.usersPage.users;
}

export const getFriends = createSelector([getFriendsSelector], (users) => {
    return  users.filter(u => u.photos.small !== null);
})