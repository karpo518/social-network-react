import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { getUserProfile, getUserStatus, TProfileActions } from "../../redux/profile-reducer";
import { sGetProfile } from "../../redux/profile-selectors";
import { TAppState } from "../../redux/redux-store";
import { useRequireAuth } from "../../utils/hooks/useRequireAuth";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export const ProfilePage:FC  = () =>  {

  const profile = useSelector(sGetProfile)
  const auth = useRequireAuth()

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TProfileActions>>();

  const navigate = useNavigate();
  const params = useParams();

  let userId = null as number | null 
  if(params.userId) {
    userId = parseInt(params.userId)
  }
  else if(auth.userId) {
    userId = auth.userId
  }
  else {
    navigate('/login')
  }

  const getProfileData = useCallback( (userId: number) => {
    dispatch(getUserProfile(userId))
    dispatch(getUserStatus(userId))
  },[dispatch])

  useEffect(() => {
    if(userId) {
      getProfileData(userId)
    }
  },[userId, getProfileData])
  

    return (
      <>
      {
        profile 
          ? <div>
              <ProfileInfo isOwner={!params.userId} 
                           profile={profile} />
              <MyPostsContainer />
            </div>
          : <div>Нет данных для отображения</div>
      }
      </>
    );
}
