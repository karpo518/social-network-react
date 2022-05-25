import Preloader from "../../common/Preloader/Preloader";
import defaultPhoto from "../../../assets/images/user.jpg";
import s from "./ProfileInfo.module.css";
import { NavLink } from "react-router-dom";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus }) => {
  if (!profile) {
    return <Preloader />;
  }

  let availableContacts = Object.keys(profile.contacts).filter((k) => { return profile.contacts[k]  })

  return (
    <div>
      <div className={s.descriptionBlock}>
        <div>
          <img className={s.avatar} src={profile.photos.large != null ? profile.photos.large : defaultPhoto} alt={'Profile avatar'}/>
        </div>

        <NavLink to={`/dialogs/${profile.userId}`} className={s.startChat} >Send message</NavLink>
        
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
