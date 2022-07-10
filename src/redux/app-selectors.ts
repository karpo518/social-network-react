import { TAppState } from './redux-store';

export const getInitialized = (state: TAppState) => {
    return  state.app.initialized;
}

/* export const getBreadcrumbs = (state: TAppState) => {
    return  state.app.breadcrumbs;
} */