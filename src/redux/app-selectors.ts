import { TAppState } from './redux-store';

export const SGetAppStatus = (state: TAppState) => {
    return  state.app.appStatus;
}

export const SGetErrorMessage = (state: TAppState) => {
    return  state.app.errorMessage;
}

/* export const getBreadcrumbs = (state: TAppState) => {
    return  state.app.breadcrumbs;
} */