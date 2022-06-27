import s from "./User.module.css";
import defaultPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";
import { TUser } from "../../types/types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { getFollowingInProgress } from "../../redux/users-selectors";

type TProps = {
  user: TUser
  onFollow: (userId: number) => void
  onUnfollow: (userId: number) => void
}

const User: FC<TProps> = ({user, onFollow, onUnfollow}) => {

  const followingInProgress = useSelector(getFollowingInProgress)

  return (
    <div className={s.user} key={user.id}>
      <div className={s.imageCol}>
        <NavLink to={"/profile/" + user.id}>
          <img
            className={s.image}
            src={user.photos.small != null ? user.photos.small : defaultPhoto}
            alt={"Profile avatar"}
          />
        </NavLink>
        <div>
          {user.followed ? (
            <button
              onClick={() => {
                onUnfollow(user.id);
              }}
              className={`${s.btn} ${s.btnFollow}`}
              disabled={followingInProgress.some((id: number) => id === user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => {
                onFollow(user.id);
              }}
              className={`${s.btn} ${s.btnUnfollow}`}
              disabled={followingInProgress.some((id) => id === user.id)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className={s.mainCol}>
        <div className={s.mainLeft}>
          <div className={s.name}>{user.name}</div>
          <div className={s.status}>{user.status}</div>
        </div>
        <div className={s.mainRight}>
          <div className={s.location}>
            <div className={s.city}>
              <span>{"user.location.city"}</span>,
            </div>
            <div className={s.country}>
              <span>{"user.location.country"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
