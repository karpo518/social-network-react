import { v1 } from 'uuid';
import { Dispatch } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { chatAPI } from './../api/chat-api';
import { TChatMessage } from './../components/Chat/Messages';
import { activateBrokenStatus, TAppActions } from './app-reducer';
import { InferValueTypes, TAppState, TBaseThunk } from "./redux-store";


const chatAT = {
  SET_MESSAGES: 'MY-APP/CHAT/SET_MESSAGES' as const,
  SET_STATUS: 'MY-APP/CHAT/SET_STATUS' as const
}

export type TWsStatus = 0 | 1 | 2 | 3

let initialState = {
    messages: [] as Array<TChatMessage>,
    status: WebSocket.CLOSED as TWsStatus
};

type initialStateType = typeof initialState

const chatReducer = (state: initialStateType = initialState, action: TChatActions): initialStateType => {
    
    switch(action.type) {
        case chatAT.SET_MESSAGES: {
          console.log(state.messages)
            let newMessages = action.payload.newMessages.map(m => ({...m, id: v1() }))
            return action.payload.replaceMode
              ? {...state, messages: [...newMessages].filter((item, index, array) => index >= (array.length - 100)) }
              : {...state, messages: [...state.messages, ...newMessages].filter((item, index, array) => index >= (array.length - 100)) }

        }
        case chatAT.SET_STATUS: {
          return {...state, status: action.payload.newStatus }

      }
        default:
            return {...state};
    }
};

export type TChatActions = ReturnType<InferValueTypes<typeof chatAC>>

export const chatAC = {
  setMessages: (newMessages: Array<TChatMessage>, replaceMode = false) => ({type: chatAT.SET_MESSAGES, payload: {newMessages, replaceMode} }),
  setStatus: (newStatus: TWsStatus) => ({type: chatAT.SET_STATUS, payload:{newStatus} }),
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

let _errorHandler: (e: Event) => void

const errorHandler = (dispatch: ThunkDispatch<TAppState, unknown, TAppActions> ) => {
  if(!_errorHandler) {
    _errorHandler = (e: Event) => { 
      console.log('Возникла ошибка!')
      console.log(e)
      chatAPI.stop()
      dispatch(activateBrokenStatus())
    }
  }
  return _errorHandler
}


export const startMessagesListening = (): TBaseThunk<TChatActions, void> => {
  return (dispatch) => {
      chatAPI.start()
      // chatAPI.subscribe('errorOccurred', errorHandler(dispatch))
      chatAPI.subscribe('messagesReceived', newMessageHandler(dispatch))
  }
}

export const stopMessagesListening = (): TBaseThunk<TChatActions, void> => {
  return (dispatch) => {
      chatAPI.unsubscribe('messagesReceived', newMessageHandler(dispatch))
      // chatAPI.unsubscribe('errorOccurred', errorHandler(dispatch))
      chatAPI.stop()
  }
}

export const sendMessage = (message: string): TBaseThunk<TChatActions, void> => {
  return async (dispatch) => {
      chatAPI.sendMessage(message)
  }
}

export default chatReducer;