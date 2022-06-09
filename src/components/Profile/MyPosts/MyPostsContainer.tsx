import { connect } from "react-redux";
import {profileAC, sendPost } from "../../../redux/profile-reducer";
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

let MapDispatchToProps = {
  updateNewPostText: profileAC.updateNewPostText, 
  sendPost
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType> (mapStateToProps, MapDispatchToProps) (MyPosts);

export default MyPostsContainer;
