import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/user.jpg";
import s from "./ProfileInfo.module.css";
import { NavLink } from "react-router-dom";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React, { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  const inputFileRef = React.useRef(null)

  let [editMode,setEditMode] = useState(false)

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoClicked = () => {
    inputFileRef.current.click()
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  const activateEditMode = () => {
    setEditMode(true)
  }

  const onSubmit = (formData) => {
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
                               status={status} 
                               updateStatus={updateStatus} 
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


export const Contact = ({contactTitle, contactValue}) => {
  return (
    <li>
      <span className={s.aboutTitle}>{contactTitle}:</span>
      <a href={`${contactValue}`} target="_blank" rel="noreferrer" >
        {`${contactValue}`}
      </a>
    </li>
  );
}

export const ProfileData = ({profile, status, isOwner, updateStatus, activateEditMode}) => {

  let availableContacts = Object.keys(profile.contacts).filter((k) => { return profile.contacts[k]  })

  return (
  <div className={s.description}>
    {isOwner && (
        <div className={s.editDataWrap}>
          <button onClick={activateEditMode} >Edit</button>
        </div>
      )
    }
    <div className={s.aboutItem}>
      <div className={s.fullName}>{profile.fullName}</div>
    </div>
    <div className={s.aboutItem}>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} / >
    </div>
    <div className={s.aboutItem}>
      <span className={s.aboutTitle}>About me: </span>
      {profile.aboutMe ? profile.aboutMe : "-"}
    </div>
    <div className={s.aboutItem}>
      <span className={s.aboutTitle}>Looking for a job:</span>
      {profile.lookingForAJob ? "yes" : "no"}
    </div>
    <div className={s.aboutItem}>
      <div className={s.aboutTitle}>My professional skills:</div>
      {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "-"}
    </div>
    {availableContacts.length > 0 && (
        <div className={s.aboutItem}>
          <div className={s.aboutTitle}>Контакты: </div>
          <ul className={s.contactList}>
            {availableContacts.map(function (title) {
                return <Contact key={title} contactTitle={title} contactValue={profile.contacts[title]} />
            })}
          </ul>
        </div>
      )
    }
  </div>
  )
}

export default ProfileInfo;
