import { connect } from "react-redux";
import {sendPost, updateNewPostText } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";
import MyPosts from "./MyPosts";

type MapStatePropsType = {
  posts: Array<PostType>
  newPostText: string
}

type MapDispatchPropsType = {
  updateNewPostText: (newPostText: string) => void
  sendPost: (formData: any) => void
}

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType> (mapStateToProps, {updateNewPostText, sendPost}) (MyPosts);

export default MyPostsContainer;
