import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/user.jpg";
import s from "./ProfileInfo.module.css";
import { NavLink } from "react-router-dom";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { propTypes } from "redux-form";
import React from "react";

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto }) => {

  const inputFileRef = React.useRef(null)

  if (!profile) {
    return <Preloader />;
  }

  let availableContacts = Object.keys(profile.contacts).filter((k) => { return profile.contacts[k]  })

  const onMainPhotoClicked = () => {
    inputFileRef.current.click()
  }

  const onMainPhotoSelected = (e) => {
    if(e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

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
        
        <div className={s.description}>
          <div className={s.aboutItem}>
            <div className={s.fullName}>{profile.fullName}</div>
          </div>
          <div className={s.aboutItem}>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} / >
          </div>
          <div className={s.aboutItem}>
            <span className={s.aboutTitle}>Обо мне: </span>
            {profile.aboutMe ? profile.aboutMe : "-"}
          </div>
          <div className={s.aboutItem}>
            <span className={s.aboutTitle}>Ищу работу:</span>
            {profile.lookingForAJob ? "да" : "нет"}
          </div>
          <div className={s.aboutItem}>
            <div className={s.aboutTitle}>Подробности:</div>
            {profile.lookingForAJobDescription ? profile.lookingForAJobDescription : "-"}
          </div>
          {availableContacts.length > 0 && (
              <div className={s.aboutItem}>
                <div className={s.aboutTitle}>Контакты: </div>
                <ul className={s.contactList}>
                  {availableContacts.map(function (key) {

                      return (
                        <li key={key}>
                          <span className={s.aboutTitle}>{key}:</span>
                          <a href={`https://${profile.contacts[key]}`} target="_blank" rel="noreferrer" >
                            {`https://${profile.contacts[key]}`}
                          </a>
                        </li>
                      );
                    
                  })}
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
