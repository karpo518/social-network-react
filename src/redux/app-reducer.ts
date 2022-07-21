import { getAuthUserData } from "./auth-reducer";
import { InferValueTypes, TBaseThunk } from "./redux-store";

const appAT = {
  SET_APP_STATUS: 'MY-APP/APP/SET_APP_STATUS' as const,
  SET_ERROR_MESSAGE: 'MY-APP/APP/SET_ERROR_MESSAGE' as const,
/*   SET_BREADCRUMBS: 'MY-APP/APP/SET_BREADCRUMBS' as const */
}

export enum EAppStatus {
  not_inited = 0,
  inited = 1,
  broken = -1,
}

let initialState = {
    appStatus: EAppStatus.not_inited as EAppStatus,
    errorMessage: ''
};

type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: TAppActions): initialStateType => {
    
    switch(action.type) {
        case appAT.SET_APP_STATUS: {
            return {...state, appStatus: action.newStatus};
        }
        case appAT.SET_ERROR_MESSAGE: {
          return {...state, errorMessage: action.errorMessage};
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
  setAppStatus: (newStatus: EAppStatus) => ({type: appAT.SET_APP_STATUS, newStatus}),
  setErrorMessage: (errorMessage: string) => ({type: appAT.SET_ERROR_MESSAGE, errorMessage}),
/*   setBreadcrumbs: (breadcrumbs: Array<TBreadcrumb>) => ({type: appAT.SET_BREADCRUMBS, breadcrumbs}) */
}

export const initializeApp = (): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(appAC.setAppStatus(EAppStatus.inited))
  }
}

export const activateBrokenStatus = (errorMessage: string = ''): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    dispatch(appAC.setAppStatus(EAppStatus.broken))
    dispatch(appAC.setErrorMessage(errorMessage))
  }
}

/* export const updateBreadcrumbs = (breadcrumbs: Array<TBreadcrumb>): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    const newBreadcrumbs = [{title: 'Home', url: '/'}, ...breadcrumbs]
    dispatch(appAC.setBreadcrumbs(newBreadcrumbs))
  }
} */

export default appReducer;