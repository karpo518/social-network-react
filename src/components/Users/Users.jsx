import Preloader from "../common/Preloader/Preloader";
import Paginator from "./Paginator";
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, ...props} ) => {

  return (
    <div>
      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}  onPageChanged={onPageChanged} currentPage={currentPage} />
      <div>
        { 
          props.isFetching 
            ? <Preloader />
            : props.users.map((u) => {
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
