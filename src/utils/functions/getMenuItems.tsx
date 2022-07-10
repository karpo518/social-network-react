import { Link } from 'react-router-dom';
import { FaAddressCard, FaMusic, FaRegComments, FaRegNewspaper, FaRegSun, FaUser, FaUserFriends } from 'react-icons/fa';
import { MenuProps } from "antd";

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const getMenuItems: () => Array<MenuItem> = () => {
  const items: MenuProps['items'] = [
      getItem('Profile', 'item1', <FaUser />, [
        getItem(<Link to="/profile">My page</Link>, 'g1', <FaAddressCard />),
        getItem(<Link to="/dialogs">Messages</Link>, 'g2', <FaRegComments />),
        getItem(<Link to="/settings">Settings</Link>, 'g3', <FaRegSun />),
      ]),
      getItem(<Link to="/users">Users</Link>, 'item2', <FaUserFriends />),
      getItem(<Link to="/news">News</Link>, 'item3', <FaRegNewspaper />),
      getItem(<Link to="/music">Music</Link>, 'item4', <FaMusic />),
  ];

  return items
}