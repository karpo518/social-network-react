import { reset } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { dialogsAPI, profileAPI } from "../api/api";
import { DialogType } from "../types/types";
import { AppStateType, InferValueTypes } from "./redux-store";

const dialogsAT = {
    SET_NEW_DIALOG: "MY-APP/DIALOGS/SET_NEW_DIALOG" as const,
    RESET_NEW_DIALOG: "MY-APP/DIALOGS/RESET_NEW_DIALOG" as const,
    SET_SELECTED_DIALOG: "MY-APP/DIALOGS/SET_SELECTED_DIALOG" as const,
    ADD_MESSAGE: "MY-APP/DIALOGS/ADD_MESSAGE" as const,
    SET_MESSAGES: "MY-APP/DIALOGS/SET_MESSAGES" as const,
    SET_DIALOGS: "MY-APP/DIALOGS/SET_DIALOGS" as const,
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<messageType>,
    selectedId: null as number | null,
    newDialog: null as DialogType | null,
}

type InitialStateType = typeof initialState

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

const dialogsReducer = (state: InitialStateType = initialState, action: TDialogsActions): InitialStateType => {

  switch (action.type) {
    case dialogsAT.SET_DIALOGS:
        return {...state, dialogs: action.dialogs }

    case dialogsAT.SET_MESSAGES:{
        return {...state, messages: [...action.messages]}
    }

    case dialogsAT.SET_NEW_DIALOG:
    {
        return {...state, 
                newDialog: action.newDialog}
    }

    case dialogsAT.RESET_NEW_DIALOG:
    {
        return {...state, 
                newDialog: null}
    }
    
    case dialogsAT.SET_SELECTED_DIALOG:
    {
        return {...state, 
                selectedId: action.selectedId}
    }     
    

    case dialogsAT.ADD_MESSAGE:
    {
        return {...state,
                messages: [...state.messages, action.message] };
    }

    default:
      return state;
  }
};

export type TDialogsActions = ReturnType<InferValueTypes<typeof DialogsAC>>

export const DialogsAC = {
    setMessages: (messages: Array<messageType>) => ({ type: dialogsAT.SET_MESSAGES, messages: messages}),
    setDialogs: (dialogs: Array<DialogType>) => ({ type: dialogsAT.SET_DIALOGS, dialogs }),
    setNewDialog: (newDialog: DialogType) => ({ type: dialogsAT.SET_NEW_DIALOG, newDialog}),
    resetNewDialog: () => ({ type: dialogsAT.RESET_NEW_DIALOG }),
    setSelectedDialog: (selectedId: number) => ({ type: dialogsAT.SET_SELECTED_DIALOG, selectedId }),
    addMessage: (message: messageType) => ({ type: dialogsAT.ADD_MESSAGE, message }),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TDialogsActions>

export const getDialogs = (selectedId: number): ThunkType => {
    
    return async (dispatch) => {

        let response = await dialogsAPI.get()
        let dialogs: Array<DialogType> = response.data;
        dispatch(DialogsAC.setDialogs(dialogs));
        let dialogExists = dialogs.some((d) => d.id === selectedId);
        if(selectedId && !dialogExists) {
          dispatch(createNewDialog(selectedId))
        }
        else {
          dispatch(DialogsAC.resetNewDialog())
        }
    };
};

export const getMessages = (selectedId: number): ThunkType => {
    return async (dispatch) => {
        if(!selectedId) {
            dispatch( DialogsAC.setMessages([]) );
        }
        else {
            let response = await dialogsAPI.getMessages(selectedId)
            dispatch(DialogsAC.setMessages(response.data.items) );
        }
    }
}

export const createNewDialog = (userId: number): ThunkType => {
    
    return async (dispatch) => {
        let response = await profileAPI.getProfile(userId)
        let p = response.data
        let newDialog: DialogType = { id: userId, 
                                      userName: p.fullName, 
                                      hasNewMessages: false, 
                                      lastUserActivityDate: '',
                                      lastDialogActivityDate: '',
                                      newMessagesCount: 0, 
                                      photos: { small: p.photos.small, large: null } }
        dispatch(DialogsAC.setNewDialog(newDialog));
    };
}

export const sendMessage = (userId: number, formData: any): ThunkType => {
  
    return async (dispatch) => {
        let body = formData.body;
        let response = await dialogsAPI.sendMessage(userId, body)
        if (response.data.resultCode === 0) {
            dispatch(DialogsAC.addMessage(response.data.data.message));
            dispatch(reset('DialogsAddMessageForm'));
        }
    };
};

export default dialogsReducer;