import { EResultCodes, EResultCodeCaptcha } from './../api/api';
import { Action } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI, authAPI, updateAPIKey } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = "MY-APP/AUTH/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "MY-APP/AUTH/GET_CAPTCHA_URL_SUCCESS";
const TOGGLE_IS_FETCHING = "MY-APP/AUTH/TOGGLE_IS_FETCHING";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  photoUrl: null as string | null,
  isAuth: false as boolean,
  isFetching: false as boolean,
  captchaUrl: null as string | null, // if null, then captcha is not required
};

export type authType = typeof initialState

type authUserDataType = {
  userId: number | null, 
  email: string | null, 
  login: string | null, 
  photoUrl: string | null, 
  isAuth: boolean
}

const authReducer = (state: authType = initialState, action: ActionsTypes): authType => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload };
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return { ...state, captchaUrl: action.captchaUrl };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }

    default:
      return { ...state };
  }
};

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: authUserDataType;
}

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  captchaUrl: string | null;
}

type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
}

export type showSubmitErrorsType = Action<typeof stopSubmit>

type ActionsTypes = setAuthUserDataActionType | getCaptchaUrlSuccessActionType | toggleIsFetchingActionType | showSubmitErrorsType

export const setAuthUserData = (authData: authUserDataType): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { ...authData },
});

export const getCaptchaUrlSuccess = (captchaUrl: string | null): getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  captchaUrl,
});

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});

export const showSubmitErrors = (formName: string, messages: Array<string>, fieldsErrors: any): showSubmitErrorsType => {
    let formErrors: any = {};
    for (let i = 0; i < fieldsErrors.length; i++) {
      let fieldName: string = fieldsErrors[i]["field"];
      let fieldError: string = fieldsErrors[i]["error"];
      formErrors[fieldName] = fieldError;

      let messageKey: number  = messages.indexOf(fieldError);
      if (messageKey > -1) {
        messages.splice(messageKey, 1);
      }
    }

    if (messages) {
      formErrors["_error"] = messages.join(", ");
    }

    if (Object.entries(formErrors).length === 0) {
      formErrors["_error"] = "Unknown error!";
    }

    return stopSubmit(formName, formErrors);
};


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authAPI.me();
    console.log("Авторизация получена!");
    if (response.data.resultCode === EResultCodes.Success) {
      let { id, email, login } = response.data.data;
      let response2 = await profileAPI.getProfile(id);
      console.log("Профиль получен!");
      dispatch(toggleIsFetching(false));
      let photoUrl = response2.data.photos.small;
      let isAuth = true;
      dispatch(setAuthUserData({userId: id, email, login, photoUrl, isAuth}));
    }
  };
};

export const login = (formData: any): ThunkType => {
  return async (dispatch) => {
    let email: string = formData.email, 
        password: string = formData.password, 
        rememberMe: boolean = formData.rememberMe, 
        captcha: string = formData.captcha, 
        apiKey: string = formData.apiKey;

    dispatch(toggleIsFetching(true));

    let response = await authAPI.login(email, password, rememberMe, captcha);
    dispatch(toggleIsFetching(false));
    if (response.data.resultCode === EResultCodes.Success) {
      updateAPIKey(apiKey)
      let {userId, login} = response.data.data;
      let response2 = await profileAPI.getProfile(userId);
      let photoUrl = response2.data.photos.small;
      let isAuth = true;
      dispatch(getCaptchaUrlSuccess(null));
      dispatch(setAuthUserData({userId, email, login, photoUrl, isAuth }));
    } else {
      if (response.data.resultCode === EResultCodeCaptcha.CaptchaIsRequired) {
        let response3 = await authAPI.captchaUrl();
        dispatch(getCaptchaUrlSuccess(response3.data.url));
        dispatch(
          showSubmitErrors('login', response.data.messages, response.data.fieldsErrors)
        );
      } else {
        dispatch(
          showSubmitErrors('login', response.data.messages, response.data.fieldsErrors)
        );
      }
    }
  };
};

export const updateCaptchaUrl = (): ThunkType => {
  return async (dispatch: any) => {
    let response = await authAPI.captchaUrl()
    dispatch(getCaptchaUrlSuccess(response.data.url))
  }
}

export const logout = (formData: any): ThunkType => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    let response = await authAPI.logout()
    dispatch(toggleIsFetching(false))
    if (response.data.resultCode === EResultCodes.Success) {
      let userId = null,
          email = null,
          login = null,
          photoUrl = null,
          isAuth = false 

      updateAPIKey('')
      dispatch(setAuthUserData({userId, email, login, photoUrl, isAuth}))
    }
    console.log(formData);
  }
}

export default authReducer;
