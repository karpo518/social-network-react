import { FC } from "react"
import { ContactsType, ProfileType } from "../../../types/types"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import s from "./ProfileInfo.module.css";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatus: (newStatus: string) => void
    activateEditMode: () => void
  }
  
const ProfileData: FC<PropsType> = ({profile, status, isOwner, updateStatus, activateEditMode}) => {
  
    let availableContacts = Object.keys(profile.contacts).filter((k) => { return profile.contacts[k as keyof ContactsType]  })
  
    return (
      <div className={s.description}>
        {isOwner && (
          <div className={s.editDataWrap}>
            <button onClick={activateEditMode}>Edit</button>
          </div>
        )}
        <div className={s.aboutItem}>
          <div className={s.fullName}>{profile.fullName}</div>
        </div>
        <div className={s.aboutItem}>
          <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
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
                    contactValue={profile.contacts[title as keyof ContactsType]}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  type ContactPropsType = {
  contactTitle: string
  contactValue: string
}

const Contact: FC<ContactPropsType> = ({contactTitle, contactValue}) => {
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