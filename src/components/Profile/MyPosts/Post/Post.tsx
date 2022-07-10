import s from "./Post.module.css";
import userPhoto from "../../../../assets/images/user.jpg";
import { FC } from "react";
import { TPost } from "../../../../types/types";

const Post: FC<TPost> = (props) => {

  return (
    <div className={s.item}>
      <div className={s.imgWrap} ><img src={userPhoto} alt={'author img'} /></div>
      <div className={s.messageBody}>{props.message}</div>
      <div>
        <span className={s.likesCount} >{props.likesCount} like(s)</span>
      </div>
    </div>
  );
};

export default Post;
