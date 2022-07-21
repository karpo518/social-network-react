import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { chatAPI } from "../../api/chat-api";
import { chatAC, sendMessage, TChatActions, TWsStatus } from "../../redux/chat-reducer";
import { SGetStatus } from "../../redux/chat-selectors";
import { TAppState } from "../../redux/redux-store";
import { showPopup } from "../../utils/popup-helpers";
import { required } from "../../utils/validators/validators";
import { createFormikField, FormikInputArea } from "../common/FormControls/FormControls";
import s from './Chat.module.css';

type TFormData = {
    message: string
}

export const AddMessageForm: FC = () => {

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TChatActions>>();

  const status = useSelector(SGetStatus)

  const submitHandler = (values: TFormData, helpers: FormikHelpers<TFormData> ) => {

    if(status === WebSocket.OPEN) {
      dispatch(sendMessage(values.message))
      helpers.setSubmitting(false);
      helpers.resetForm()
    }
    else {
      showPopup('Не удалось отправить сообщение, так как не удаётся подключиться к серверу!')
    }
  }

  const changeWsStatusHandler= (newStatus: TWsStatus) => {
      dispatch(chatAC.setStatus(newStatus))
  }

  useEffect(() => {
    let unsubscribe = chatAPI.subscribe('statusChanged', changeWsStatusHandler)
    return () => { unsubscribe() }
  });
  
  return (
    <div className={s.formWrap} >
        <h2>Send message</h2>
        <Formik initialValues={ {message: ''} } onSubmit={submitHandler}  >
          {
            ({values, setSubmitting, resetForm}) => (
                <Form onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    submitHandler(values, {setSubmitting, resetForm} as FormikHelpers<TFormData> );
                    //props.submitForm()
                  }
                }} >
                    <div>
                    { createFormikField<TFormData>('Write text here..', 'message', [required], FormikInputArea, {fieldType: 'textarea'}) }
                    </div>
                    <div className={s.submitWrap} >
                        <Button disabled={status !== WebSocket.OPEN} type="primary" htmlType="submit">Send</Button>
                    </div>
                </Form>
            )
        }
        </Formik>
    </div>
  );
};