import { Avatar, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FC, memo, UIEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import defaultPhoto from "../../assets/images/user.jpg";
import { SGetMessages } from "../../redux/chat-selectors";
import s from './Chat.module.css';
import './Chat.css';

export const Messages: FC= () => {

  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)

  const chatBottomRef = useRef<null | HTMLDivElement>(null)

  const messages = useSelector(SGetMessages)

  const onScrollHandler = (e: UIEvent<HTMLElement>) => {
      const el = e.currentTarget
      if(el.scrollHeight - el.scrollTop - el.clientHeight < 1) {
        !isAutoScroll && setIsAutoScroll(true)
      }
      else {
        isAutoScroll && setIsAutoScroll(false)
      }
  }

  useEffect(() => {
    isAutoScroll && chatBottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [chatBottomRef, isAutoScroll,messages])

  return (
    <>
      <div className={s.messages} onScroll={onScrollHandler} >
        {messages.map((m: TChatMessage, index: number) => (
          <Message key={m.id} {...m} />
        ))}
        <div className={s.chatBottom} ref={chatBottomRef}></div>
      </div>
      <div className={s.isAutoScrollWrap + ' ' + 'isAutoScrollWrap'}>
        <Checkbox checked={isAutoScroll} onChange={(e: CheckboxChangeEvent) => setIsAutoScroll(!isAutoScroll) }>Включить автоскролл</Checkbox>
      </div>
    </>
  );
};

export type TChatAPIMessage = {
 
    userId: number
    userName: string
    photo: string | null
    message: string
}

export type TChatMessage = TChatAPIMessage & {id: string}

export const Message: FC<TChatMessage> = memo((props) => {
    const userPhoto = props.photo || defaultPhoto
    console.log('Message')
    return (
      <div className={s.message}>
        <div className={s.messageHead}>
          <Avatar src={userPhoto} />{" "}
          <span className={s.userName}>{props.userName}</span>
        </div>
        <div className={s.messageBody}>{props.message}</div>
      </div>
    );
});