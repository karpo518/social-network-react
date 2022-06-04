import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'MY-APP/APP/SET_INITIALIZED';

let initialState = {
    initialized: false as boolean,
};

type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    
    switch(action.type) {
        case SET_INITIALIZED: {
            return {...state, initialized: action.initialized};
        }
        default:
            return {...state};
    }
};

type setInitializedActionType = {
  type: typeof SET_INITIALIZED;
  initialized: boolean;
}

export const setInitialized = (initialized: boolean): setInitializedActionType => ({type: SET_INITIALIZED, initialized});

export const initializeApp = () => {
  return async (dispatch: any) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(setInitialized(true))
  }
}

export default appReducer;