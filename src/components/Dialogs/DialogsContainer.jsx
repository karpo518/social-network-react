import Dialogs from "./Dialogs";
import {
  getDialogs,
  getMessages,
  sendMessage,
  createNewDialog,
  resetNewDialog,
  setSelectedDialog,
} from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const DialogsContainer = (props) => {
  
  const params = useParams();

  let selectedId = params.userId ? parseInt(params.userId) : 0;

  let [setSelectedDialog, getDialogs, getMessages] = [props.setSelectedDialog, props.getDialogs, props.getMessages]

  useEffect(() => {
    setSelectedDialog(selectedId)
    getDialogs(selectedId)
    getMessages(selectedId)
  }, [selectedId, setSelectedDialog, getDialogs, getMessages])

  useEffect(() => {

        let timerId = setInterval(() => { 
          getDialogs(selectedId)
          getMessages(selectedId)
        }, 15000)

        return () => {
          clearTimeout(timerId);
        }
  }, [selectedId, setSelectedDialog, getDialogs, getMessages])      

  return (
    <Dialogs
      dialogs={props.dialogs}
      newDialog={props.newDialog}
      messages={props.messages}
      selectedId={props.selectedId}
      sendMessage={props.sendMessage}
    />
  );
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
    getMessages,
    sendMessage,
    setSelectedDialog
  }),
  withAuthRedirect
)(DialogsContainer);
