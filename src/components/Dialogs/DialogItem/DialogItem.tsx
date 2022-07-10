import { FC } from "react";
import { NavLink } from "react-router-dom";
import { TDialog } from "../../../types/types";
import s from "./../Dialogs.module.css";
import defaultPhoto from "../../../assets/images/user.jpg";
import cn from "classnames"; 

const DialogItem: FC<TDialog> = ({id, 
                                  userName, 
                                  hasNewMessages, 
                                  lastDialogActivityDate, 
                                  lastUserActivityDate,
                                  newMessagesCount, 
                                  photos,
                                  selectedId}) => {
  let path = `/dialogs/${id}`;
  let image = photos.small || defaultPhoto
  return (
    <div className={ cn(s.dialog, {[s.active]: id === selectedId }) }>
      <div className={s.image} >
        <img src={image} alt={'dialog img'} />
      </div>
      <div className={s.name}>
        <NavLink to={path}>{userName}</NavLink>
        {
          newMessagesCount 
            ? <span className={s.newCount}>+{newMessagesCount}</span> 
            : ''
        }
      </div>
    </div>
  );
};

export default DialogItem;
