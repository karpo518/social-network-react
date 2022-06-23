import { usersAPI } from '../api/users-api';
import { TUser } from './../types/types';
import { InferValueTypes, TBaseThunk } from "./redux-store"
import { friendsOnly } from './users-reducer';

// action types of usersReduser
const sidebarAT =
{
    SET_FRIENDS: 'MY-APP/SIDEBAR/SET_FRIENDS' as const,
}



let initialState = {
    friends: [
        /*{ id: 2, name: "Andrey", "image": "https://lemanagement.se/wp-content/uploads/2017/12/1485175881mlkcl9q.jpg" },
        { id: 3, name: "Sveta", "image": "https://cdn1.flamp.ru/e65b00bdb664b5db6b41e3ee3bfe1578.jpg" },
        { id: 4, name: "Sasha", "image": "https://wallbox.ru/resize/1024x1024/wallpapers/main2/201710/148923624258c3f1127d0107.83973406.jpg" },
        */
    ] as Array<TUser>,
};

type initialStateType = typeof initialState

export type TSidebarActions = ReturnType<InferValueTypes<typeof sidebarAC>>


export const sidebarAC = {

    setFriends: (friends: Array<TUser>) => ({ type: sidebarAT.SET_FRIENDS, friends: friends }),
}

const sidebarReducer = (state: initialStateType = initialState, action: TSidebarActions): initialStateType => {
    switch(action.type) {
        case sidebarAT.SET_FRIENDS: {
            return {...state, friends: action.friends };
        }
        default:
            return {...state};

    }
};

export const loadFriends = (): TBaseThunk<TSidebarActions> => {
    return async (dispatch) => {
        console.log('run loadFriends')
        const res = await usersAPI.getUsers(1, 100, friendsOnly.Yes)
        const friends = res.data.items.filter(u => u.photos.small !== null).sort(() => Math.floor(Math.random() - 0.5)).slice(0, 5)
        console.log(friends)
        dispatch(sidebarAC.setFriends(friends));

    }
}

export default sidebarReducer;