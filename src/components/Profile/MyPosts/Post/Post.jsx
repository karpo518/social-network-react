import s from "./Post.module.css";

const Post = (props) => {

  return (
    <div className={s.item}>
      <img src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png" alt={'author img'} />
      {props.message}
      <div>
        <span className={s.likesCount} >{props.likesCount} like(s)</span>
      </div>
    </div>
  );
};

export default Post;
