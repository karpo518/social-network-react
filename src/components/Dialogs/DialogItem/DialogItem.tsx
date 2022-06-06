import { FC } from "react";
import { NavLink } from "react-router-dom";
import { DialogType } from "../../../types/types";
import s from "./../Dialogs.module.css";
import defaultPhoto from "../../../assets/images/user.jpg";

const DialogItem: FC<DialogType> = (props) => {
  let path = `/dialogs/${props.id}`;
  let image = props.photos.small || defaultPhoto
  return (
    <div className={s.dialog + " " + s.active}>
      <div className={s.image} >
        <img src={image} alt={'dialog img'} />
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
