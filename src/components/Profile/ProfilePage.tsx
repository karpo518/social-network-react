import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { getUserProfile, getUserStatus, TProfileActions } from "../../redux/profile-reducer";
import { sGetProfile } from "../../redux/profile-selectors";
import { TAppState } from "../../redux/redux-store";
import { useRequireAuth } from "../../utils/hooks/useRequireAuth";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export const ProfilePage:FC  = () =>  {

  const profile = useSelector(sGetProfile)
  const auth = useRequireAuth()

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TProfileActions>>();

  const params = useParams();

  const navigate = useNavigate();

  let userId = null as number | null 
  if(params.userId) {
    userId = parseInt(params.userId)
  }
  else if(auth.userId) {
    userId = auth.userId
  }

  const getProfileData = useCallback( (userId: number) => {
    dispatch(getUserProfile(userId))
    dispatch(getUserStatus(userId))
  },[dispatch])

  useEffect(() => {
    if(userId) {
      getProfileData(userId)
    }
    else {
      navigate('/login')
    }
  },[userId, getProfileData, navigate])
  

    return (
      <>
      {
        profile 
          ? <div>
              <ProfileInfo isOwner={!params.userId} 
                           profile={profile} />
            </div>
          : <div>Нет данных для отображения</div>
      }

      </>
    );
}
