import { FC } from "react";
import { NavLink } from "react-router-dom";
import { TFriend } from "../../types/types";
import Friend from "./Friend/Friend";
import s from "./Navbar.module.css";

type PropsType = {
  friends: Array<TFriend>
}

const Navbar: FC<PropsType> = (props) => {
  let friendsData = props.friends.map((f) => (
    <Friend id={f.id} image={f.image} name={f.name} key={f.id} />
  ));

  return (
    <nav className={s.nav}>
      <div className={s.menu}>
        <div className={s.title}>Menu</div>
        <ul>
          <li className={s.item}>
            <NavLink
              to="/profile"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              Profile
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/dialogs"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              Messages
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/news"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              News
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/music"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              Music
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/settings"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              Settings
            </NavLink>
          </li>
          <li className={s.item}>
            <NavLink
              to="/users"
              className={(navData) => (navData.isActive ? s.active : "")}
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={s.friends}>
        <div className={s.title}>Friends</div>
        <ul>{friendsData}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
