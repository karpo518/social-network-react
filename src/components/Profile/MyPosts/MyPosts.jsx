import React from "react";
import { reduxForm } from "redux-form";
import { maxLength, required } from "../../../utils/validators/validators";
import { createField, InputArea } from "../../common/FormControls/FormControls";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

let maxLength300 = maxLength(300)

const MyPosts = React.memo((props) => {
  
  let postsElements = props.posts.map(p => <Post className={s.post} message={p.message} likesCount={p.likesCount} key={p.id} /> );

  let onSubmit = (formData) => {
    props.sendPost(formData.newPostBody);  
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostFormRedux  onSubmit={onSubmit} />
      <div className={s.posts}>
         { postsElements }
      </div>
    </div>
  );
});

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >

      { createField('Write your message here..', 'newPostBody', [required, maxLength300], InputArea, {fieldType: 'textarea'}) }

      <div>
        <button >Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: "ProfileAddPostForm" })(AddPostForm);

export default MyPosts;
