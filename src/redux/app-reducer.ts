import { getAuthUserData } from "./auth-reducer";
import { InferValueTypes, TBaseThunk } from "./redux-store";

const appAT = {
  SET_INITIALIZED: 'MY-APP/APP/SET_INITIALIZED' as const,
/*   SET_BREADCRUMBS: 'MY-APP/APP/SET_BREADCRUMBS' as const */
}

let initialState = {
    initialized: false as boolean,
/*     breadcrumbs: [{title: 'Home', url: '/'}] as Array<TBreadcrumb> */
};

type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: TAppActions): initialStateType => {
    
    switch(action.type) {
        case appAT.SET_INITIALIZED: {
            return {...state, initialized: action.initialized};
        }
/*         case appAT.SET_BREADCRUMBS: {
          return {...state, breadcrumbs: action.breadcrumbs};
        } */
        default:
            return {...state};
    }
};

export type TAppActions = ReturnType<InferValueTypes<typeof appAC>>

export const appAC = {
  setInitialized: (initialized: boolean) => ({type: appAT.SET_INITIALIZED, initialized}),
/*   setBreadcrumbs: (breadcrumbs: Array<TBreadcrumb>) => ({type: appAT.SET_BREADCRUMBS, breadcrumbs}) */
}

export const initializeApp = (): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(appAC.setInitialized(true))
  }
}

/* export const updateBreadcrumbs = (breadcrumbs: Array<TBreadcrumb>): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    const newBreadcrumbs = [{title: 'Home', url: '/'}, ...breadcrumbs]
    dispatch(appAC.setBreadcrumbs(newBreadcrumbs))
  }
} */

export default appReducer;