import Profile from "./Profile";
import React from "react";
import { connect } from "react-redux";
import { getUserProfile,getStatus,updateStatus } from "../../redux/profile-reducer";
import { useParams,useLocation,useNavigate } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";



// wrapper to use react router's v6 hooks in class component(to use HOC pattern, like in router v5)
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
          <Component
              {...props}
              router={{ location, navigate, params }}
          />
      );
  }

  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {

  getProfileData = () => {
    let userId = null 
    if(this.props.router.params.userId) {
      userId = this.props.router.params.userId
    }

    else if(this.props.auth.id) {
      userId = this.props.auth.id
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
  componentDidUpdate(prevProps) {
    
    if (prevProps.router.params.userId !== this.props.router.params.userId) {
        
        this.getProfileData()
    }
  }
  
  render () {
    return (
      <>
      {
        this.props.profile 
          ? <Profile profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
          : <div>Нет данных для отображения</div>
      }
      </>
    );
  };
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, {getUserProfile,getStatus, updateStatus}),
  withRouter,
  withAuthRedirect,
)(ProfileContainer)
