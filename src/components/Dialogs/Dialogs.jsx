import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm } from "redux-form";
import defaultPhoto from "../../assets/images/user.jpg";
import { createField, InputArea } from "../common/FormControls/FormControls";
import { required, maxLength} from "../../utils/validators/validators";

let maxLength300 = maxLength(300)

const AddMessageForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      <div className="title">Send message</div>

      { createField('Write your message here..', 'body', [required, maxLength300], InputArea, {fieldType: 'textarea'}) }
      <div>
        <button className={s.submit} >Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({ form: "DialogsAddMessageForm" })(AddMessageForm);

const Dialogs = (props) => {
  const onSubmit = (formData) => {

      props.sendMessage(props.selectedId, formData);
  };

  console.log(props)

  let allDialogs = props.newDialog === null ? props.dialogs : [props.newDialog, ...props.dialogs]

  let dialogsElements = allDialogs.map((d) => {
        // console.log(d)
        return <DialogItem userName={d.userName} id={d.id} image={d.photos.small || defaultPhoto} key={d.id} newMessagesCount={d.newMessagesCount} />
    }
  )

  let messagesElements = props.messages.map((m) => {
      return (
        <Message
          senderId={m.senderId}
          selectedId={props.selectedId}
          senderName={m.senderName}
          isIncoming={m.isIncoming}
          body={m.body}
          key={m.id}
        />
      )
  })

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogsElements}</div>
      {
        props.selectedId 
          ? <div className={s.messages}>
              <div className={s.list}>{messagesElements}</div>
              <AddMessageFormRedux onSubmit={onSubmit} userId={props.selectedId} />
            </div>
          : <div className={s.selectDialog} >Please, select dialog!</div>
      }
    </div>
  );
};

export default Dialogs;
