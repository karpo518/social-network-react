import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import sidebarReducer from "./sidebar-reducer"
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducer
export type TAppState = ReturnType<RootReducerType>

// Вспомогательная функция для извлечения типа из action creators
export type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never

export type TBaseThunk<TActions extends Action, R = Promise<any>> = ThunkAction<R, TAppState, unknown, TActions>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;