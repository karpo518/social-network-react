import { reset } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { dialogsAPI, profileAPI } from "../api/api";
import { DialogType } from "../types/types";
import { AppStateType } from "./redux-store";

const SET_NEW_DIALOG = "MY-APP/DIALOGS/SET_NEW_DIALOG";
const RESET_NEW_DIALOG = "MY-APP/DIALOGS/RESET_NEW_DIALOG";
const SET_SELECTED_DIALOG = "MY-APP/DIALOGS/SET_SELECTED_DIALOG";
const ADD_MESSAGE = "MY-APP/DIALOGS/ADD_MESSAGE";
const SET_MESSAGES = "MY-APP/DIALOGS/SET_MESSAGES";
const SET_DIALOGS = "MY-APP/DIALOGS/SET_DIALOGS";

let initialState = {
    dialogs: [] as Array<dialogType>,
    messages: [] as Array<messageType>,
    selectedId: null as number | null,
    newDialog: null as DialogType | null,
}

type InitialStateType = typeof initialState

type dialogType = {
    id: number;
    userName: string;
    hasNewMessages: boolean;
    lastUserActivityDate: string;
    newMessagesCount: number;
    photos: { small: string | null, large: string | null }
};

type messageType = {
    id: string;
    body: string;
    translatedBody: string | null;
    addedAt: string;
    recipientId: number;
    senderId:  number;
    senderName: string;
    viewed: boolean;
}

const dialogsReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case SET_DIALOGS:
        return {...state, dialogs: action.dialogs }

    case SET_MESSAGES:{
        return {...state, messages: [...action.messages]}
    }

    case SET_NEW_DIALOG:
    {
        return {...state, 
                newDialog: action.newDialog}
    }

    case RESET_NEW_DIALOG:
    {
        return {...state, 
                newDialog: null}
    }
    
    case SET_SELECTED_DIALOG:
    {
        return {...state, 
                selectedId: action.selectedId}
    }     
    

    case ADD_MESSAGE:
    {
        return {...state,
                messages: [...state.messages, action.message] };
    }

    default:
      return state;
  }
};

type setMessagesActionType = {
    type: typeof SET_MESSAGES;
    messages: Array<messageType>;
}

type setDialogsActionType = {
    type: typeof SET_DIALOGS;
    dialogs: Array<dialogType>;
}

type setNewDialogActionType = {
    type: typeof SET_NEW_DIALOG;
    newDialog: dialogType;
}

type resetNewDialogActionType = {
    type: typeof RESET_NEW_DIALOG;
}

type setSelectedDialogActionType = {
    type: typeof SET_SELECTED_DIALOG;
    selectedId: number;
}

type addMessageActionType = {
    type: typeof ADD_MESSAGE;
    message: messageType;
}

type ActionsTypes = setMessagesActionType | setDialogsActionType | setNewDialogActionType |
    resetNewDialogActionType | setSelectedDialogActionType | addMessageActionType

export const setMessages = (messages: Array<messageType>): setMessagesActionType => ({ type: SET_MESSAGES, messages: messages});

export const setDialogs = (dialogs: Array<dialogType>): setDialogsActionType => ({ type: SET_DIALOGS, dialogs });

export const setNewDialog = (newDialog: dialogType): setNewDialogActionType => ({ type: SET_NEW_DIALOG, newDialog});

export const resetNewDialog = (): resetNewDialogActionType => ({ type: RESET_NEW_DIALOG });

export const setSelectedDialog = (selectedId: number): setSelectedDialogActionType => ({ type: SET_SELECTED_DIALOG, selectedId });

export const addMessage = (message: messageType): addMessageActionType => ({ type: ADD_MESSAGE, message });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getDialogs = (selectedId: number): ThunkType => {
    
    return async (dispatch) => {

        let response = await dialogsAPI.get()
        let dialogs: Array<dialogType> = response.data;
        dispatch(setDialogs(dialogs));
        let dialogExists = dialogs.some((d) => d.id === selectedId);
        if(selectedId && !dialogExists) {
          dispatch(createNewDialog(selectedId))
        }
        else {
          dispatch(resetNewDialog())
        }
    };
};

export const getMessages = (selectedId: number): ThunkType => {
    return async (dispatch) => {
        if(!selectedId) {
            dispatch( setMessages([]) );
        }
        else {
            let response = await dialogsAPI.getMessages(selectedId)
            dispatch(setMessages(response.data.items) );
        }
    }
}

export const createNewDialog = (userId: number): ThunkType => {
    
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        let p = response.data
        let newDialog: dialogType = { id: userId, 
                                      userName: p.fullName, 
                                      hasNewMessages: false, 
                                      lastUserActivityDate: '',
                                      newMessagesCount: 0, 
                                      photos: { small: p.photos.small, large: null } }
        dispatch(setNewDialog(newDialog));
    };
}

export const sendMessage = (userId: number, formData: any): ThunkType => {
  
    return async (dispatch) => {
        let body = formData.body;
        let response = await dialogsAPI.sendMessage(userId, body)
        if (response.data.resultCode === 0) {
            dispatch(addMessage(response.data.data.message));
            dispatch(reset('DialogsAddMessageForm'));
        }
    };
};

export default dialogsReducer;