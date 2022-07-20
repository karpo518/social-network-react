import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { chatAPI } from "../../api/chat-api";
import { sendMessage, TChatActions } from "../../redux/chat-reducer";
import { TAppState } from "../../redux/redux-store";
import { required } from "../../utils/validators/validators";
import { createFormikField, FormikInputArea } from "../common/FormControls/FormControls";
import s from './Chat.module.css';

type TFormData = {
    message: string
}

export const AddMessageForm: FC = () => {

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TChatActions>>();

  const [wsReady, setWsReady] = useState(chatAPI.isReady())

  const submitHandler = (values: TFormData, helpers: FormikHelpers<TFormData> ) => {

    if(wsReady) {
      dispatch(sendMessage(values.message))
      helpers.setSubmitting(false);
      helpers.resetForm()
    }
  }

  const changeWsStatusHandler= (newStatus: 'open' | 'close') => {
    const wsReady = newStatus === 'open' ? true : false;
    setWsReady(wsReady)
  }

  useEffect(() => {
    let unsubscribe = chatAPI.subscribeNewStatus(changeWsStatusHandler)
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
                        <Button disabled={!wsReady} type="primary" htmlType="submit">Send</Button>
                    </div>
                </Form>
            )
        }
        </Formik>
    </div>
  );
};