import { Avatar } from "antd";
import { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import defaultPhoto from "../../assets/images/user.jpg";
import { SGetMessages } from "../../redux/chat-selectors";
import s from './Chat.module.css';

export const Messages: FC= () => {

  const chatBottomRef = useRef<null | HTMLDivElement>(null)

  const messages = useSelector(SGetMessages)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [chatBottomRef, messages])

  return (
    <div className={s.messages}>
        {messages.map((m: TChatMessage, index: number) => (
          <Message key={index} {...m} />
        ))}
        <div className={s.chatBottom} ref={chatBottomRef}></div>
    </div>
  );
};

export type TChatMessage = {
 
    userId: number
    userName: string
    photo: string | null
    message: string
}

export const Message: FC<TChatMessage> = (props) => {
    const userPhoto = props.photo || defaultPhoto
    return (
      <div className={s.message}>
        <div className={s.messageHead}>
          <Avatar src={userPhoto} />{" "}
          <span className={s.userName}>{props.userName}</span>
        </div>
        <div className={s.messageBody}>{props.message}</div>
      </div>
    );
};