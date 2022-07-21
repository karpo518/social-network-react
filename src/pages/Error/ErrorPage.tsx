import { FC } from "react";
import { useSelector } from "react-redux";
import { SGetErrorMessage } from "../../redux/app-selectors";
import s from "./ErrorPage.module.css";

export const ErrorPage: FC = () => {
    let message = useSelector(SGetErrorMessage)
    return (
        <div className={s.wrap} >
            <div className={s.content}>
                <h1>Ошибка!</h1>
                { message.length 
                    ? <p>{message}</p>
                    : <p>Приложение было остановлено из-за неожиданной ошибки. Попробуйте перезагрузить страницу или откройте её позже!</p>
                }
            </div>
        </div>
  );
};
