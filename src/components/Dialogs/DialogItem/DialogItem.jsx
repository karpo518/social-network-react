import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

const DialogItem = (props) => {
  let path = `/dialogs/${props.id}`;
  return (
    <div className={s.dialog + " " + s.active}>
      <div className={s.image} >
        <img src={props.image} alt={'dialog img'} />
      </div>
      <div className={s.name}>
        <NavLink to={path}>{props.userName}</NavLink>
        {
          props.newMessagesCount 
            ? <span className={s.newCount}>+{props.newMessagesCount}</span> 
            : ''
        }
      </div>
    </div>
  );
};

export default DialogItem;
