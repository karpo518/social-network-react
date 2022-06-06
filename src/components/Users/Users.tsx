import { FC } from "react";
import { UserType } from "../../types/types";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "./Paginator";
import User from "./User";

type PropsType = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  users: Array<UserType>
  isFetching: boolean
  followingInProgress: Array<number>
  onPageChanged: (pageNumber: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

const Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props} ) => {

  return (
    <div>
      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}  onPageChanged={onPageChanged} currentPage={currentPage} />
      <div>
        { 
          props.isFetching 
            ? <Preloader />
            : props.users.map((u: UserType) => {
                return (
                  <User
                    key={u.id}
                    user={u}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    followingInProgress={props.followingInProgress}
                  />
                );
            })
        }
      </div>
    </div>
  );
};

export default Users;
