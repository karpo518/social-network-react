import { TAppState } from './redux-store';

export const sGetIsAuth = (state: TAppState) => {
    return  state.auth.isAuth;
}

export const sGetLogin = (state: TAppState) => {
    return  state.auth.login;
}

export const sGetPhotoUrl = (state: TAppState) => {
    return  state.auth.photoUrl;
}

export const sGetIsFetching = (state: TAppState) => {
    return  state.auth.isFetching;
}