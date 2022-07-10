import { Button, Col, Row, Switch } from "antd";
import cn from "classnames";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { sGetSelectedUsername } from "../../redux/dialogs-selectors";
import { TDialog, TMessage } from "../../types/types";
import { maxLength, required } from "../../utils/validators/validators";
import { createField, InputArea } from "../common/FormControls/FormControls";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

type TProps = {
  selectedId: number | null
  dialogs: Array<TDialog>
  messages: Array<TMessage>
  newDialog: TDialog | null
  sendMessage: (userId: number, formData: TFormData) => void
}

const Dialogs: FC<TProps> = ({selectedId, dialogs, messages, newDialog, sendMessage}) => {

  let [selectDialogMode, setSelectDialogMode] = useState(!selectedId)

  const onSubmit = (formData: any) => {
    if(selectedId !== null) { 
      sendMessage(selectedId, formData)
    }
  }

  useEffect(() =>{ 
    // Если selectedId изменился и при этом не равен null, значит выбран какой-то диалог.
    // В этом случае нужно свернуть список диалогов на мобильных
    if(selectedId) {
      setSelectDialogMode(false)
    }
  }, [selectedId])


  let allDialogs = newDialog === null ? dialogs : [newDialog, ...dialogs]

  let dialogsElements = allDialogs.map((d: TDialog) => {
        return <DialogItem key={d.id} selectedId={selectedId} {...d} />
    }
  )

  let messagesElements = messages.map((m: TMessage) => {
      return (
        <Message {...m} selectedId={selectedId} />
      )
  })

  const selectedUsername = useSelector(sGetSelectedUsername)

  return (
    <div className={s.dialogs}>
      <h1>Сообщения</h1>
      <Row>
        <Col span={24} md={6} >
          <div className={s.dialogListHead} >
            Показать все диалоги <Switch checked={selectDialogMode} onChange={setSelectDialogMode} />

            {!selectDialogMode && <div className={s.mobileTitle} >Диалог с <span className={s.username}>{selectedUsername}</span></div>}

          </div>
          <div className={cn(s.dialogItems, {[s.selectDialogMode]: selectDialogMode === true }) } >
            {dialogsElements}
          </div>
        </Col>
        <Col span={24}  md={18} >
          {
            selectedId 
              ? <div className={s.messages}>
                  <div className={s.list}>{messagesElements}</div>
                  <AddMessageFormRedux onSubmit={onSubmit} userId={selectedId} />
                </div>
              : <div className={s.selectDialog} >Please, select dialog!</div>
          }
        </Col>
      </Row>
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
      <div className="submitBlock">
        <Button type="primary" htmlType="submit" >Send</Button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<TFormData, TOwnProps>({ form: "DialogsAddMessageForm" })(AddMessageForm);

export default Dialogs;
