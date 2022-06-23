import { NavLink } from "react-router-dom";
import { TFriend } from "../../../types/types";
import s from "./../Navbar.module.css";

type TProps = TFriend

const Friend = (props: TProps) => {

  return (
      <li className={s.item}>
          <NavLink to={'/profile/' + props.id } className={ navData => navData.isActive ? s.active : '' } >
              <div className={s.image}><img src={props.image ? props.image : undefined}  alt={'friend avatar'} /></div>
              <div className={s.name}>{props.name}</div>
          </NavLink>
      </li>
  );
};

export default Friend;
