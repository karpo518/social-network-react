import s from "./User.module.css";
import defaultPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";
import { TUser } from "../../types/types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { getFollowingInProgress } from "../../redux/users-selectors";
import { Button, Col } from "antd";

type TProps = {
  user: TUser
  onFollow: (userId: number) => void
  onUnfollow: (userId: number) => void
}

const User: FC<TProps> = ({user, onFollow, onUnfollow}) => {

  const followingInProgress = useSelector(getFollowingInProgress)

  return (
    <Col span={24} md={12}>
    <div className={s.user} key={user.id}>
      <div className={s.imageCol}>
        <NavLink to={"/profile/" + user.id}>
          <img
            className={s.image}
            src={user.photos.small != null ? user.photos.small : defaultPhoto}
            alt={"Profile avatar"}
          />
        </NavLink>
        <div className={s.buttons}>
          {user.followed ? (
            <Button
              onClick={() => {
                onUnfollow(user.id);
              }}
              className={`${s.btn} ${s.btnFollow}`}
              disabled={followingInProgress.some((id: number) => id === user.id)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              onClick={() => {
                onFollow(user.id);
              }}
              className={`${s.btn} ${s.btnUnfollow}`}
              disabled={followingInProgress.some((id) => id === user.id)}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
      <div className={s.mainCol}>
        <div className={s.mainLeft}>
          <NavLink to={"/profile/" + user.id}>
            <div className={s.name}>{user.name}</div>
          </NavLink>
          <div className={s.status}>{user.status}</div>
        </div>
{/*         <div className={s.mainRight}>
          <div className={s.location}>
            <div className={s.city}>
              <span>{user.location.city}</span>,
            </div>
            <div className={s.country}>
              <span>{user.location.country}</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </Col>
  );
};

export default User;
