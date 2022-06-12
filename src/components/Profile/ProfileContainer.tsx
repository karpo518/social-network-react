import Profile from "./Profile";
import { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile,getStatus,updateStatus,savePhoto,saveProfile } from "../../redux/profile-reducer";
import { useParams,useLocation,useNavigate } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { TProfile } from "../../types/types";
import { authType } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  profile: TProfile | null
  status: string
  auth: authType
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => any
  getStatus: (userId: number) => any
  updateStatus: (newStatus: string) => void
  savePhoto: (file: any) => void
  saveProfile: (newProfile: TProfile) => any 
}

type HOCPropsType = {
  router: any
}

type PropsType = MapStatePropsType & MapDispatchPropsType & HOCPropsType

class ProfileContainer extends Component<PropsType> {

  getProfileData = () => {
    let userId = null 
    if(this.props.router.params.userId) {
      userId = this.props.router.params.userId
    }

    else if(this.props.auth.userId) {
      userId = this.props.auth.userId
    }
    else {
      this.props.router.navigate('/login')
    }
    
    if(userId) {
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }
  }

  componentDidMount = () => {
    
    this.getProfileData()
  }
  componentDidUpdate(prevProps: PropsType) {
    
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
        
      console.log([prevProps.router.params.userId, this.props.router.params.userId])  
      this.getProfileData()
    }
  }
  
  render () {
    return (
      <>
      {
        this.props.profile 
          ? <Profile isOwner={!this.props.router.params.userId} 
                     profile={this.props.profile} 
                     status={this.props.status} 
                     updateStatus={this.props.updateStatus} 
                     savePhoto={this.props.savePhoto} 
                     saveProfile={this.props.saveProfile} 
                     />
          : <div>Нет данных для отображения</div>
      }
      </>
    );
  };
}

// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Comp: typeof Component) {
  function ComponentWithRouterProp(props: any) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Comp
              {...props}
              router={{ location, navigate, params }}
          />
      );
  }

  return ComponentWithRouterProp;
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  auth: state.auth,
});

const MapDispatchToProps = {
  getUserProfile,
  getStatus, 
  updateStatus, 
  savePhoto, 
  saveProfile
}

export default compose(
  connect<MapStatePropsType,MapDispatchPropsType, HOCPropsType, AppStateType>(mapStateToProps, MapDispatchToProps),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)
