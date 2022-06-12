import s from "./Post.module.css";
import userPhoto from "../../../../assets/images/user.jpg";
import { FC } from "react";
import { TPost } from "../../../../types/types";

const Post: FC<TPost> = (props) => {

  return (
    <div className={s.item}>
      <img src={userPhoto} alt={'author img'} />
      {props.message}
      <div>
        <span className={s.likesCount} >{props.likesCount} like(s)</span>
      </div>
    </div>
  );
};

export default Post;
