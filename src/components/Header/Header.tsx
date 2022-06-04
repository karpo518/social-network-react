import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import userPhoto from "../../assets/images/user.jpg";
import logo from "../../assets/images/logo.png";
import { propsType } from "./HeaderContainer";

const Header = (props: propsType) => {
  return (
    <header className={s.header}>
      <div className={s.logo}>
        <img src={logo} alt={'logo img'} />
      </div>
      <div className={s.loginBlock}>
        { props.isAuth 
        ? (
          <div className={s.loginString}>
            <div className={s.visibleMenu} >
              <img src={props.photoUrl ? props.photoUrl : userPhoto} alt={'user img'} />{" "}
              <span className={s.loginName}>{props.login}</span>
            </div>
            <div className={s.hiddenMenu} >
              <ul>
                <li><span onClick={props.logout}>Выйти</span></li>
              </ul>
            </div>  
          </div>
          ) 
        : (
          <NavLink to={"/login"}>Войти</NavLink>
        )}
      </div>
      <div className="clear"></div>
    </header>
  );
};

export default Header;
