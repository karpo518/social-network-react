import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { TPost } from "../../../types/types";
import { maxLength, required } from "../../../utils/validators/validators";
import { createField, InputArea } from "../../common/FormControls/FormControls";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

let maxLength300 = maxLength(300)

type TProps = {
  posts: Array<TPost>
  sendPost: (newPostBody: string) => void
}

const MyPosts = React.memo<TProps>((props) => {
  
  let postsElements = props.posts.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount} /> );

  let onSubmit = (formData: TFormData) => {
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

type TFormData = {
  newPostBody: string
}

type TOwnProps = {
  onSubmit: (FormData: any) => void
}

type TFormProps = TOwnProps & InjectedFormProps<TFormData,TOwnProps>

const AddPostForm: FC<TFormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >

      { createField<TFormData>('Write your message here..', 'newPostBody', [required, maxLength300], InputArea, {fieldType: 'textarea'}) }

      <div>
        <button >Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm<TFormData, TOwnProps>({ form: "ProfileAddPostForm" })(AddPostForm);

export default MyPosts;
