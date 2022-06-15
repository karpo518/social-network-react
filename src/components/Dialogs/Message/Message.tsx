import s from "./../Dialogs.module.css";
import defaultPhoto from "../../../assets/images/user.jpg";
import { FC } from "react";
import { TMessage } from "../../../types/types";

type TOtherProps = {
  selectedId: number | null
}

type TProps = TMessage & TOtherProps

const Message: FC<TProps> = (props) => {
  
  let ownershipClass = props.senderId === props.selectedId ? "incoming" : "outgoing";
  return (
    <div className={s.message + " " + s[ownershipClass]}>
      <div className={s.author}>
        <div className={s.image}>
          <img src={defaultPhoto} alt={'default img'} />
        </div>
      </div>
      <div className={s.body}>{props.body}</div>
    </div>
  );
};

export default Message;
