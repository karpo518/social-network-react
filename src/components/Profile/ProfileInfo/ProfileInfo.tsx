import { ChangeEvent, FC, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import defaultPhoto from "../../../assets/images/user.jpg";
import { savePhoto, saveProfile, TProfileActions } from "../../../redux/profile-reducer";
import { sGetStatus } from "../../../redux/profile-selectors";
import { TAppState } from "../../../redux/redux-store";
import { TProfile } from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";
import s from "./ProfileInfo.module.css";

type TProps = {
  profile: TProfile | null
  isOwner: boolean
}

const ProfileInfo: FC<TProps> = ({profile, isOwner }) => {

  const status  = useSelector(sGetStatus)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TProfileActions>>();

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
    if(e.target.files?.length) {
      dispatch(savePhoto(e.target.files[0]))
    }
  }
  const activateProfileEditMode = () => {
    setEditMode(true)
  }

  const onSubmit = (formData: TProfile) => {
    dispatch(saveProfile(formData)).then(() => setEditMode(false) )
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
                           activateProfileEditMode={activateProfileEditMode} />
        }

      </div>
    </div>
  );
};

export default ProfileInfo;
