import s from "./Post.module.css";
import userPhoto from "../../../../assets/images/user.jpg";

const Post = (props) => {

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
