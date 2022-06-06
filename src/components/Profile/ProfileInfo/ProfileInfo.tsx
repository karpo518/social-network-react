import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/user.jpg";
import s from "./ProfileInfo.module.css";
import { NavLink } from "react-router-dom";
import { ChangeEvent, FC, useRef, useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";
import ProfileData from "./ProfileData";

type PropsType = {
  profile: ProfileType
  status: string
  isOwner: boolean
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (newProfile: ProfileType) => any 
}

const ProfileInfo: FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  const inputFileRef = useRef<HTMLInputElement>(null)

  let [editMode,setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoClicked = () => {
    if (inputFileRef.current !== null) {
      inputFileRef.current.click()
    }
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null && e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  const activateEditMode = () => {
    setEditMode(true)
  }

  const onSubmit = (formData: any) => {
    saveProfile(formData).then(() => setEditMode(false) )
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div>
          <img className={s.avatar + (isOwner ? ` ${s.ownerImage}` : '') } 
               src={profile.photos.large != null ? profile.photos.large : defaultPhoto} 
               alt={'Profile avatar'}
               title={isOwner ? 'Click for uploading' : ''} 
               onClick={onMainPhotoClicked} />
          {isOwner && (
              <input className={s.updateAvatarBtn} ref={inputFileRef} type={'file'} onChange={onMainPhotoSelected} />
            )
          }
        </div>
        
        {!isOwner && (
            <div className={s.startChatWrap}>
              <NavLink to={`/dialogs/${profile.userId}`} >Send message</NavLink>
            </div>
          )
        }

        {editMode 
            ? <ProfileDataForm initialValues={profile}
                               profile={profile}
                               onSubmit={onSubmit} />
            : <ProfileData profile={profile} 
                           status={status} 
                           isOwner={isOwner} 
                           updateStatus={updateStatus} 
                           activateEditMode={activateEditMode}  />
        }


      </div>
    </div>
  );
};

export default ProfileInfo;
