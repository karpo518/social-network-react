import { connect } from "react-redux";
import {sendPost, updateNewPostText } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";


let mapStateToProps= (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  };
}

const MyPostsContainer = connect(mapStateToProps, {updateNewPostText, sendPost}) (MyPosts);

export default MyPostsContainer;
