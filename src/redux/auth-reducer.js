import { stopSubmit } from "redux-form";
import { profileAPI, authAPI, updateAPIKey } from "../api/api";

const SET_USER_DATA = "SET-USER-DATA";
const SET_CAPTHA_URL = "SET_CAPTHA_URL";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  id: null,
  email: null,
  login: null,
  photoUrl: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.payload };
    }
    case SET_CAPTHA_URL: {
      return { ...state, captchaUrl: action.captchaUrl };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }

    default:
      return { ...state };
  }
};

export const setAuthUserData = (id, email, login, photoUrl, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, photoUrl, isAuth },
});
export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTHA_URL,
  captchaUrl,
});
export const toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching: isFetching,
});

export const getAuthUserData = () => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authAPI.me();
    console.log("Авторизация получена!");
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      let response2 = await profileAPI.getProfile(id);
      console.log("Профиль получен!");
      dispatch(toggleIsFetching(false));
      let photoUrl = response2.data.photos.small;
      let isAuth = true;
      dispatch(setAuthUserData(id, email, login, photoUrl, isAuth));
    }
  };
};

export const login = (formData) => {
  return async (dispatch) => {
    let email = formData.email || "";
    let password = formData.password || "";
    let rememberMe = formData.rememberMe || false;
    let captcha = formData.captcha || "";
    let apiKey = formData.apiKey || "";

    dispatch(toggleIsFetching(true));

    let response = await authAPI.login(email, password, rememberMe, captcha);
    dispatch(toggleIsFetching(false));
    if (response.data.resultCode === 0) {
      let userId = response.data.data.userId;
      let response2 = await profileAPI.getProfile(userId);
      console.log(response2);
      let login = response2.data.fullName;
      let photoUrl = response2.data.photos.small;
      let isAuth = true;
      updateAPIKey(apiKey)
      dispatch(setCaptchaUrl(null));
      dispatch(setAuthUserData(userId, email, login, photoUrl, isAuth));
    } else {
      if (response.data.resultCode === 10) {
        let response3 = await authAPI.captchaUrl();
        console.log("Получили url капчи");
        console.log(response);
        console.log(response3);
        dispatch(setCaptchaUrl(response3.data.url));
        dispatch(
          showSubmitErrors(response.data.messages, response.data.fieldsErrors)
        );
      } else {
        dispatch(
          showSubmitErrors(response.data.messages, response.data.fieldsErrors)
        );
      }
    }
    console.log(formData);
  };
};

export const showSubmitErrors = (messages, fieldsErrors) => {
  return (dispatch) => {
    let formErrors = {};
    for (let i = 0; i < fieldsErrors.length; i++) {
      let fieldName = fieldsErrors[i]["field"];
      let fieldError = fieldsErrors[i]["error"];
      formErrors[fieldName] = fieldError;

      let messageKey = messages.indexOf(fieldError);
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

    let action = stopSubmit("login", formErrors);
    console.log("Вызываем ошибку");
    dispatch(action);
  };
};

export const updateCaptchaUrl = () => {
  return async (dispatch) => {
    let response = await authAPI.captchaUrl()
    console.log("Получили url капчи");
    console.log(response);
    dispatch(setCaptchaUrl(response.data.url))
  }
}

export const logout = (formData) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = await authAPI.logout()
    dispatch(toggleIsFetching(false))
    if (response.data.resultCode === 0) {
      let { userId, email, login, photoUrl, isAuth } = [
        null,
        null,
        null,
        null,
        false,
      ];
      updateAPIKey('')
      dispatch(setAuthUserData(userId, email, login, photoUrl, isAuth))
    }
    console.log(formData);
  }
}

export default authReducer;
