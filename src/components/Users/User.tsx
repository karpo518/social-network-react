import s from "./User.module.css";
import defaultPhoto from "../../assets/images/user.jpg";
import { NavLink } from "react-router-dom";
import { TUser } from "../../types/types";
import { FC } from "react";

type TProps = {
  user: TUser
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
}

const User: FC<TProps> = ({user, follow, unfollow, followingInProgress}) => {

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
                unfollow(user.id);
              }}
              className={`${s.btn} ${s.btnFollow}`}
              disabled={followingInProgress.some((id: number) => id === user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => {
                follow(user.id);
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
