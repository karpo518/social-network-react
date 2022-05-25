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
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const DialogsContainer = (props) => {
  
  const params = useParams();

  let selectedId = params.userId ? parseInt(params.userId) : 0;

  let [setSelectedDialog, getDialogs, getMessages] = [props.setSelectedDialog, props.getDialogs, props.getMessages]

  useEffect(() => {
    console.log("Use effect: set selected id")
    setSelectedDialog(selectedId)
    getDialogs(selectedId)
    getMessages(selectedId)
  }, [selectedId, setSelectedDialog, getDialogs, getMessages])

  useEffect(() => {
      console.log("Use effect: update dialogs and messages");

        let timerId = setInterval(() => {
          console.log(`Таймаут сработал! selectedId: ${selectedId}`)  
          getDialogs(selectedId)
          getMessages(selectedId)
        }, 15000)

        return () => {
          console.log('Демонтаж компонента!')
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
    selectDialog,
    getMessages,
    sendMessage,
    setSelectedDialog
  }),
  withAuthRedirect
)(DialogsContainer);
