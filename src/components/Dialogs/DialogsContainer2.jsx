import Dialogs from "./Dialogs";
import {
  getDialogs,
  getMessages,
  selectDialog,
  sendMessage,
  createNewDialog,
  resetNewDialog,
  setSelectedDialog,
} from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { render } from "@testing-library/react";

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


class DialogsContainer2 extends React.Component {
  componentDidMount = () => {
    console.log('componentDidMount')

    let params = this.props.router.params
    let selectedId = params.userId ? parseInt(params.userId) : 0;

    this.props.setSelectedDialog(selectedId)

    console.log([selectedId, this.props.selectedId, params.userId])
  
    this.props.setSelectedDialog(selectedId)
        
    this.props.getDialogs(selectedId)

    if(selectedId) {
        this.props.getMessages(selectedId)
    }
  }

  componentDidUpdate(prevProps) {

    console.log('componentDidUpdate')
    
    let params = this.props.router.params
    let selectedId = params.userId ? parseInt(params.userId) : 0;

    console.log([selectedId, this.props.selectedId, params.userId])

    if(selectedId !== this.props.selectedId) {
        this.props.setSelectedDialog(selectedId)
        this.props.getDialogs(selectedId)
        if(selectedId) {
          this.props.getMessages(selectedId)
        }
    }

/*
    console.log('componentDidUpdate')
    console.log([prevProps.selectedId,  this.props.selectedId])
    if(prevProps.selectedId != this.props.selectedId) {
        console.log('Изменился selectedId!');  
        this.props.setSelectedDialog(this.props.selectedId)
        this.props.getDialogs(this.props.selectedId)
        if(this.props.selectedId) {
          this.props.getMessages(this.props.selectedId)
        }
    }
*/
  }

  render() {

    console.log('DialogsContainer2 render')

    console.log(this.props)

    return (
      <Dialogs
        dialogs={this.props.dialogs}
        newDialog={this.props.newDialog}
        messages={this.props.messages}
        selectedId={this.props.selectedId}
        sendMessage={this.props.sendMessage}
      />
    );

  }
};

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    selectedId: state.dialogsPage.selectedId,
    newDialog: state.dialogsPage.newDialog,
    auth: state.auth,
  };
};

export default compose(
  connect(mapStateToProps, {
    getDialogs,
    createNewDialog,
    resetNewDialog,
    selectDialog,
    getMessages,
    sendMessage,
    setSelectedDialog
  }),
  withRouter,
)(DialogsContainer2);
