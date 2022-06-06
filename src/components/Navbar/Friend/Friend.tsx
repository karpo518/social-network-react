import { NavLink } from "react-router-dom";
import { FriendType } from "../../../types/types";
import s from "./../Navbar.module.css";

type PropsType = FriendType

const Friend = (props: PropsType) => {

  return (
      <li className={s.item}>
          <NavLink to="{'/profile/' + props.id }" className={ navData => navData.isActive ? s.active : '' } >
              <div className={s.image}><img src={props.image}  alt={'friend avatar'} /></div>
              <div className={s.name}>{props.name}</div>
          </NavLink>
      </li>
  );
};

export default Friend;
