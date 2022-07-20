import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { startMessagesListening, stopMessagesListening, TChatActions } from "../../redux/chat-reducer";
import { TAppState } from "../../redux/redux-store";
import { AddMessageForm } from "./AddMessageForm";
import { Messages } from "./Messages";

export const Chat: FC = () => {

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TChatActions>>()

  useEffect(() => {
    
    dispatch(startMessagesListening())

    return () => { 
      dispatch(stopMessagesListening())
    }

  },[dispatch])

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};