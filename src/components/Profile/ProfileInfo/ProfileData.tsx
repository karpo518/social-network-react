import { FC } from "react"
import { TContacts, TProfile } from "../../../types/types"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import s from "./ProfileInfo.module.css";
import { Button } from "antd";

type TProps = {
    profile: TProfile
    status: string
    isOwner: boolean
    activateProfileEditMode: () => void
  }
  
const ProfileData: FC<TProps> = ({profile, status, isOwner, activateProfileEditMode}) => {
  
    let availableContacts = Object.keys(profile.contacts).filter((k) => { return profile.contacts[k as keyof TContacts]  })
  
    return (
      <div className={s.description}>
        {isOwner && (
          <div className={s.editDataWrap}>
            <Button type="primary" onClick={activateProfileEditMode}>Edit</Button>
          </div>
        )}
        <div className={s.aboutItem}>
          <div className={s.fullName}>{profile.fullName}</div>
        </div>
        <div className={s.aboutItem}>
          <ProfileStatusWithHooks status={status} />
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
          {profile.lookingForAJobDescription
            ? profile.lookingForAJobDescription
            : "-"}
        </div>
        {availableContacts.length > 0 && (
          <div className={s.aboutItem}>
            <div className={s.aboutTitle}>Контакты: </div>
            <ul className={s.contactList}>
              {availableContacts.map(function (title) {
                return (
                  <Contact
                    key={title}
                    contactTitle={title}
                    contactValue={profile.contacts[title as keyof TContacts]}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  type TContactProps = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<TContactProps> = ({contactTitle, contactValue}) => {
  return (
    <li>
      <span className={s.aboutTitle}>{contactTitle}:</span>
      <a href={`${contactValue}`} target="_blank" rel="noreferrer" >
        {`${contactValue}`}
      </a>
    </li>
  );
}

export default ProfileData