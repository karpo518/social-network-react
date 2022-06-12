import { getAuthUserData } from "./auth-reducer";
import { InferValueTypes, TBaseThunk } from "./redux-store";

const appAT = {
  SET_INITIALIZED: 'MY-APP/APP/SET_INITIALIZED' as const
}

let initialState = {
    initialized: false as boolean,
};

type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: TAppActions): initialStateType => {
    
    switch(action.type) {
        case appAT.SET_INITIALIZED: {
            return {...state, initialized: action.initialized};
        }
        default:
            return {...state};
    }
};

export type TAppActions = ReturnType<InferValueTypes<typeof appAC>>

export const appAC = {
  setInitialized: (initialized: boolean) => ({type: appAT.SET_INITIALIZED, initialized})
}

export const initializeApp = (): TBaseThunk<TAppActions> => {
  return async (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(appAC.setInitialized(true))
  }
}

export default appReducer;