import { FC } from "react";
import { TUser } from "../../types/types";
import Paginator from "../common/Paginator/Paginator";
import Preloader from "../common/Preloader/Preloader";
import FilterUsersForm from "./FilterUsersForm";
import User from "./User";

type TProps = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  users: Array<TUser>
  isFetching: boolean
  followingInProgress: Array<number>
  isFriend: 0 | 1 | 2
  term: string | null
  onPageChanged: (pageNumber: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  setIsFriend: (isFriend: 0 | 1 | 2) => void
  setTerm: (term: string | null) => void
}

const Users: FC<TProps> = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props} ) => {

  return (
    <div>

      <FilterUsersForm currentPage={currentPage}
                       isFriend={props.isFriend} 
                       term={props.term} 
                       setTerm={props.setTerm} 
                       setIsFriend={props.setIsFriend} 
                       onPageChanged={onPageChanged} />



      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}  onPageChanged={onPageChanged} currentPage={currentPage} />
      <div>
        { 
          props.isFetching 
            ? <Preloader />
            : props.users.map((u: TUser) => {
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
