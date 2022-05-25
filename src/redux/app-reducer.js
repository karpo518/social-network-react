import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case SET_INITIALIZED: {
            return {...state, initialized: action.initialized };
        }

        default:
            return {...state};
    }
};

export const setInitialized = (initialized) => ({type: SET_INITIALIZED, initialized});

export const initializeApp = () => {
  return async (dispatch) => {
    let promise = dispatch(getAuthUserData())
    await Promise.all([promise])
    dispatch(setInitialized(true))
  }
}

export default appReducer;