import { Layout, Menu } from 'antd';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { TAppState } from '../../redux/redux-store';
import { loadFriends, TSidebarActions } from '../../redux/sidebar-reducer';
import { getFriends } from '../../redux/sidebar-selectors';
import { getMenuItems } from '../../utils/functions/getMenuItems';
import Friend from './Friend/Friend';
import s from "./Sidebar.module.css";


const Sidebar: FC = () => {

  const friends = useSelector(getFriends)

  console.log(friends)

  const friendsData = friends.map((f) => (
    <Friend id={f.id} image={f.photos.small} name={f.name} key={f.id} />
  ));

  const menuItems = getMenuItems()

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TSidebarActions>>();

  
  useEffect(() => {
    dispatch(loadFriends())
  }, [ dispatch ]);

  return (
    <Layout.Sider
      className="site-layout-background"
      breakpoint={"lg"}
      collapsedWidth={0}
      trigger={null}
      width={200}
    >
      <nav className={s.nav}>
        <div className={s.title}>Menu</div>
        <div className={s.menu}>
          <Menu
            className={s.sidebarMenu}
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
            }}
            items={menuItems}
          />
        </div>
        <div className={s.friends}>
          <div className={s.title}>Friends</div>
          <ul>{friendsData}</ul>
        </div>
      </nav>
    </Layout.Sider>
  );
}


export default Sidebar;
