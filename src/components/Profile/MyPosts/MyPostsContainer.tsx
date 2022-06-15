import { connect } from "react-redux";
import {profileAC, sendPost } from "../../../redux/profile-reducer";
import { TAppState } from "../../../redux/redux-store";
import { TPost } from "../../../types/types";
import MyPosts from "./MyPosts";

type TMapStateProps = {
  posts: Array<TPost>
  newPostText: string
}

type TMapDispatchProps = {
  updateNewPostText: (newPostText: string) => void
  sendPost: (formData: any) => void
}

let mapStateToProps = (state: TAppState) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
}

let MapDispatchToProps = {
  updateNewPostText: profileAC.updateNewPostText, 
  sendPost
}

const MyPostsContainer = connect<TMapStateProps, TMapDispatchProps, {}, TAppState> (mapStateToProps, MapDispatchToProps) (MyPosts);

export default MyPostsContainer;
