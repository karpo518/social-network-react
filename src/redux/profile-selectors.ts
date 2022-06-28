import { TAppState } from './redux-store';

export const  sGetProfile = (state: TAppState) => {
    return state.profilePage.profile
}

export const  sGetStatus = (state: TAppState) => {
    return state.profilePage.status
}

export const sGetAuth = (state: TAppState) => {
    return state.auth
}