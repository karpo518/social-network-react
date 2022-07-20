import { TChatMessage } from './../components/Chat/Messages';
import { chatAPI } from './../api/chat-api';
import { InferValueTypes, TBaseThunk } from "./redux-store";
import { Dispatch } from 'react';

const chatAT = {
  SET_MESSAGES: 'MY-APP/CHAT/SET_MESSAGES' as const
}

let initialState = {
    messages: [] as Array<TChatMessage>,
};

type initialStateType = typeof initialState

const chatReducer = (state: initialStateType = initialState, action: TChatActions): initialStateType => {
    
    switch(action.type) {
        case chatAT.SET_MESSAGES: {
            return action.payload.replaceMode
              ? {...state, messages: [...action.payload.messages] }
              : {...state, messages: [...state.messages, ...action.payload.messages] }

        }
        default:
            return {...state};
    }
};

export type TChatActions = ReturnType<InferValueTypes<typeof chatAC>>

export const chatAC = {
  setMessages: (messages: Array<TChatMessage>, replaceMode = false) => ({type: chatAT.SET_MESSAGES, payload: {messages, replaceMode} }),
}
 
export const setMessagesPromise = (messages: Array<TChatMessage>): TBaseThunk<TChatActions> => {
  return (dispatch: any) => {
    return new Promise((resolve, reject) => {
      dispatch(chatAC.setMessages(messages));
      resolve(messages)
    })
  }
}

let _newMessageHandler: (newMessages: TChatMessage[]) => void

const newMessageHandler = (dispatch: Dispatch<TChatActions> ) => {
  if(!_newMessageHandler) {
    _newMessageHandler = (newMessages: TChatMessage[]) => { 
      console.log('Получено новое сообщение!')
      dispatch(chatAC.setMessages(newMessages))
    }
  }
  return _newMessageHandler
}


export const startMessagesListening = (): TBaseThunk<TChatActions, void> => {
  return (dispatch) => {
      chatAPI.start()
      chatAPI.subscribeNewMessages(newMessageHandler(dispatch))
  }
}

export const stopMessagesListening = (): TBaseThunk<TChatActions, void> => {
  return (dispatch) => {
      chatAPI.unsubscribeNewMessages(newMessageHandler(dispatch))
      chatAPI.stop()
  }
}

export const sendMessage = (message: string): TBaseThunk<TChatActions, void> => {
  return async (dispatch) => {
      chatAPI.sendMessage(message)
  }
}

export default chatReducer;