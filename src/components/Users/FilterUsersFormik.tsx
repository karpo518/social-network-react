import cn from "classnames";
import { Field, Form, Formik, useFormikContext } from "formik";
import throttle from "lodash.throttle";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { friendsOnly, TFilter, TIsFriend } from "../../redux/users-reducer";
import { getFilter } from "../../redux/users-selectors";
import s from "./Users.module.css";

type TProps = {

  onFilterChanged: (values: TFilter) => void
}

type TFormData = {
  term: string,
  isFriend: TIsFriend
}

const filterUsersFormValidate = (values: TFormData) => {
              
            const errors: any = {}
            /*
            if (!values.term) {
              errors.term = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.term)
            ) {
              errors.term = "Invalid email address";
            }*/
            return errors;
}

const FormChangeListener: React.FC = () => {
  const {values, initialValues, submitForm} = useFormikContext();
  useEffect(() => {
    if(values !== initialValues ) {
      submitForm()
    }
  }, [values, initialValues, submitForm]);
  return null;
};


const  FilterUsersFormik: FC<TProps> = React.memo((props) => {

    const filter = useSelector(getFilter)

    const onSubmit = (values: TFormData, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void} ) => {
      props.onFilterChanged(values)
      setSubmitting(false);
    }

    const tOnSubmit = throttle(onSubmit, 1000, {leading: false})

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <div className={s.inputsBlock}>
        <Formik
          initialValues={filter}
          validate={filterUsersFormValidate}
          onSubmit={tOnSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <FormChangeListener />
              <div className={cn(s.fieldItem, s.fileItemIsFriend)} >
                <label htmlFor="isFriend">Статус подписки</label>
                <Field className={s.isFriend} name="isFriend" as="select">
                  <option value={friendsOnly.Any} >Любой</option>
                  <option value={friendsOnly.Yes}>Те, на кого подписан</option>
                  <option value={friendsOnly.No}>Те, на кого НЕ подписан</option>
                </Field>
              </div>
              <div className={s.fieldItem}>
                <label htmlFor="term">Поиск по имени пользователя</label>
                <Field className={s.term} type="text" name="term" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  })

  export default FilterUsersFormik