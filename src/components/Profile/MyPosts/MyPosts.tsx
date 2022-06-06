import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { PostType } from "../../../types/types";
import { maxLength, required } from "../../../utils/validators/validators";
import { createField, InputArea } from "../../common/FormControls/FormControls";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

let maxLength300 = maxLength(300)

type PropsType = {
  posts: Array<PostType>
  sendPost: (newPostBody: string) => void
}

const MyPosts = React.memo<PropsType>((props) => {
  
  let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} /> );

  let onSubmit = (formData: any) => {
    props.sendPost(formData.newPostBody);  
  };

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <AddPostFormRedux onSubmit={onSubmit} />
      <div className={s.posts}>
         { postsElements }
      </div>
    </div>
  );
});

type FormDataType = {
  newPostBody: string
}

type OwnPropsType = {
  onSubmit: (FormData: any) => void
}

type FormPropsType = OwnPropsType & InjectedFormProps<FormDataType,OwnPropsType>

const AddPostForm: FC<FormPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >

      { createField('Write your message here..', 'newPostBody', [required, maxLength300], InputArea, {fieldType: 'textarea'}) }

      <div>
        <button >Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm<FormDataType, OwnPropsType>({ form: "ProfileAddPostForm" })(AddPostForm);

export default MyPosts;
