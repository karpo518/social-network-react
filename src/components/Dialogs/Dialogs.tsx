import { FC } from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, InputArea } from "../common/FormControls/FormControls";
import { required, maxLength} from "../../utils/validators/validators";
import { TDialog, TMessage } from "../../types/types";

type TProps = {
  selectedId: number | null
  dialogs: Array<TDialog>
  messages: Array<TMessage>
  newDialog: TDialog | null
  sendMessage: (userId: number, formData: TFormData) => void
}

const Dialogs: FC<TProps> = (props) => {
  const onSubmit = (formData: any) => {
    if(props.selectedId !== null) { 
      props.sendMessage(props.selectedId, formData)
    }
  }

  let allDialogs = props.newDialog === null ? props.dialogs : [props.newDialog, ...props.dialogs]

  let dialogsElements = allDialogs.map((d: TDialog) => {
        return <DialogItem key={d.id} {...d} />
    }
  )

  let messagesElements = props.messages.map((m: TMessage) => {
      return (
        <Message {...m} selectedId={props.selectedId} />
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

let maxLength300 = maxLength(300)

type TFormData = {
  body: string
}

type TOwnProps = {
  userId: number
  onSubmit: (formData: any) => void
}

type TFormProps = TOwnProps & InjectedFormProps<TFormData,TOwnProps>

const AddMessageForm: FC<TFormProps> = (props) => {

  return (
    <form onSubmit={props.handleSubmit} className={s.form}>
      <div className="title">Send message</div>
      { createField<TFormData>('Write your message here..', 'body', [required, maxLength300], InputArea, {fieldType: 'textarea'}) }
      <div>
        <button className={s.submit} >Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<TFormData, TOwnProps>({ form: "DialogsAddMessageForm" })(AddMessageForm);

export default Dialogs;
