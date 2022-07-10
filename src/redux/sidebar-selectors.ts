import { TAppState } from './redux-store';
import { createSelector } from 'reselect'

export const getFriendsSelector = (state: TAppState) => {
    return  state.sidebar.friends;
}

export const getFriends = createSelector([getFriendsSelector], (friends) => {
    return  friends.filter(u => u.photos.small !== null);
})