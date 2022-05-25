import s from "./../Dialogs.module.css";
import defaultPhoto from "../../../assets/images/user.jpg";

const Message = (props) => {
  
  // console.log('Сообщение!')
  // console.log([props.senderId, props.selectedId ])
  
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
