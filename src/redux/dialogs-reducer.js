import { reset } from "redux-form";
import { dialogsAPI, profileAPI } from "../api/api";

const SET_NEW_DIALOG = "SET_NEW_DIALOG";
const RESET_NEW_DIALOG = "RESET_NEW_DIALOG";
const SET_SELECTED_DIALOG = "SET_SELECTED_DIALOG";
const ADD_MESSAGE = "ADD_MESSAGE";
const SET_MESSAGES = "SET_MESSAGES";
const SET_DIALOGS = "SET_DIALOGS";
// const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";

let initialState = {
    dialogs: [],
    messages: [],
    selectedId: null,
    newDialog: null,
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_DIALOGS:
        return {...state, dialogs: action.dialogs }

    case SET_MESSAGES:{
        console.log(action)
        return {...state, messages: [...action.messages] }
    }

    case SET_NEW_DIALOG:
    {
        console.log('ADD_NEW_DEALOG!')
        console.log([ action.newDialog, ...state.dialogs])
        return {...state, 
                newDialog: action.newDialog}
    }

    case RESET_NEW_DIALOG:
    {
        console.log('Удаление нового диалога!')
        return {...state, 
                newDialog: null}
    }
    
    case SET_SELECTED_DIALOG:
    {
        console.log('Выбранный диалог задан!')
        console.log(action)
        return {...state, 
                selectedId: action.selectedId}
    }     
    

    case ADD_MESSAGE:
    {
        console.log(action)
        return {...state,
                messages: [...state.messages, action.message] };
    }

    default:
      return state;
  }
};

export const setMessages = (messages) => ({ type: SET_MESSAGES, messages: messages});

export const setDialogs = (dialogs) => ({ type: SET_DIALOGS, dialogs });

export const setNewDialog = (newDialog) => ({ type: SET_NEW_DIALOG, newDialog});

export const resetNewDialog = () => ({ type: RESET_NEW_DIALOG });

export const setSelectedDialog = (selectedId) => ({ type: SET_SELECTED_DIALOG, selectedId });

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });

export const getDialogs = (selectedId) => {
    return async (dispatch) => {

        console.log('getDialogs')
        let response = await dialogsAPI.get()
        console.log('Получение диалогов!');
        let dialogs = response.data;
        dispatch(setDialogs(dialogs));
        console.log('Установили диалоги!');
        let dialogExists = dialogs.some((d) => d.id === selectedId);
        if(selectedId && !dialogExists) {
          console.log(`Диалог с ${selectedId} существует? ${dialogExists}`)
          dispatch(createNewDialog(selectedId))
        }
        else {
          console.log(`Диалог с ${selectedId} не существует? ${dialogExists}`)
          dispatch(resetNewDialog())
        }
    };
};


export const selectDialog = (userId) => {
    return (dispatch) => {
        console.log(`selectDialog:${userId}`)
        dispatch(setSelectedDialog(userId));
    }
}

export const getMessages = (selectedId) => {
    return async (dispatch) => {
        if(!selectedId) {
            dispatch( setMessages([]) );
        }
        else {
            console.log('getMessages!');
            let response = await dialogsAPI.getMessages(selectedId)
            console.log('Сообщения загружены')
            console.log(response)
            dispatch(setMessages(response.data.items) );
        }
    }
}

export const createNewDialog = (userId) => {
    
    return async (dispatch) => {
        console.log('Создание нового диалога!');
        let response = await profileAPI.getProfile(userId)
        console.log('Получение профиля для диалога!')
        console.log(response)
        let p = response.data
        console.log(p.fullName)
        let newDialog = {id: userId, userName: p.fullName, photos: {small: p.photos.small} }
        dispatch(setNewDialog(newDialog));
    };
}


export const sendMessage = (userId, formData) => {
  
    return async (dispatch) => {
        let body = formData.body;
        let response = await dialogsAPI.sendMessage(userId, body)
        console.log(response)
        if (response.data.resultCode === 0) {
            await dispatch(addMessage(response.data.data.message));
            dispatch(reset('DialogsAddMessageForm'));
        }
    };
};

export default dialogsReducer;