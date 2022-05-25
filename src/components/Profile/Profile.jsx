import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile = (props) => {
  
  return (
    <div>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} authData={props.authData}   />
      <MyPostsContainer store={props.store} />
    </div>
  );
};

export default Profile;
