import { FC } from "react";
import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  profile: ProfileType
  isOwner: boolean
  status: string
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (newProfile: ProfileType) => any 

}

const Profile: FC<PropsType> = (props) => {
  
  return (
    <div>
      <ProfileInfo isOwner={props.isOwner} 
                   profile={props.profile} 
                   status={props.status} 
                   updateStatus={props.updateStatus} 
                   savePhoto={props.savePhoto}
                   saveProfile={props.saveProfile}   />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
