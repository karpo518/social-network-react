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
import { FC, useEffect } from "react";
import { DialogType, MessageType } from "../../types/types";
import { authType } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  selectedId: number | null,
  newDialog: DialogType | null,
  auth: authType,
}

type MapDispatchPropsType = {
  getDialogs: (selectedUserId: number) => void
  createNewDialog: (userId: number) => void
  resetNewDialog: () => void
  getMessages: (userId: number) => void
  sendMessage: (userId: number, formData: any) => void
  setSelectedDialog: (userId: number) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

export const DialogsContainer: FC<PropsType> = (props) => {
  
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    selectedId: state.dialogsPage.selectedId,
    newDialog: state.dialogsPage.newDialog,
    auth: state.auth,
  };
};

let mapDispatchToProps = {
  getDialogs,
  createNewDialog,
  resetNewDialog,
  getMessages,
  sendMessage,
  setSelectedDialog
}

export default compose(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps),
)(DialogsContainer);
