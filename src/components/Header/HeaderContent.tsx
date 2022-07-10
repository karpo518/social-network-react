import { Link } from "react-router-dom";
import s from "./HeaderContent.module.css";
import userPhoto from "../../assets/images/user.jpg";
import logo from "../../assets/images/logo.png";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sGetIsAuth, sGetIsFetching, sGetLogin, sGetPhotoUrl } from "../../redux/auth-selectors";
import { logout, TAuthActions } from "../../redux/auth-reducer";
import { ThunkDispatch } from "redux-thunk";
import { TAppState } from "../../redux/redux-store";
import Preloader from "../common/Preloader/Preloader";
import { Avatar, Button, Col, Drawer, Menu, Row } from "antd";
import { MenuOutlined} from "@ant-design/icons";
import { getMenuItems } from "../../utils/functions/getMenuItems";


const HeaderContent:FC = () => {

  const isAuth = useSelector(sGetIsAuth)
  const login = useSelector(sGetLogin)
  const photoUrl = useSelector(sGetPhotoUrl)
  const isFetching = useSelector(sGetIsFetching)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TAuthActions>>();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const menuItems = getMenuItems()

  const onMenuItemSelect = () => {
    setIsDrawerVisible(false)
  }

  return (
    <>
      { isFetching
      ? <Preloader />
      : (
        <>
          <Drawer
              title="Menu"
              placement="left"
              onClose={() => setIsDrawerVisible(false)}
              visible={isDrawerVisible}
          > 
            <Menu className={s.mobileMenu}
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={menuItems}
                onSelect={() => onMenuItemSelect() }
            />
          </Drawer>

          <Row>
            <Col span={12}>
              <div className={s.toggleDrawer} >
                <Button
                    className="menu"
                    type="primary"
                    icon={<MenuOutlined />}
                    onClick={() => setIsDrawerVisible(true)}
                />
              </div>
              <div className={s.logo}>
                <img src={logo} alt={'logo img'} />
              </div>
            </Col>
            <Col span={12}>
              <div className={s.loginBlock}>
                { isAuth 
                ? (
                  <div className={s.loginString}>
                    <div className={s.visibleMenu} >
                      <Avatar src={photoUrl ? photoUrl : userPhoto} />
                      <span className={s.loginName}>{login}</span>
                    </div>
                    <div className={s.hiddenMenu} >
                      <ul>
                        <li><span onClick={ () => dispatch(logout()) }>Выйти</span></li>
                      </ul>
                    </div>  
                  </div>
                  ) 
                : (
                  <Button><Link to={"/login"}>Войти</Link></Button>
                )}
              </div>
            </Col>
          </Row>
        </>
      ) }
    </>
  )
      
};

export default HeaderContent;
