import s from './PopupMessage.module.css'
import cn from 'classnames'
import { FC } from 'react'

type TProps = {
    type: string
    message: string
    onClose: () => void
}

const PopupMessage: FC<TProps> = ({type, message, onClose}) => {

    return (
        <div className={cn(s.wrap, {[s.error]: type === 'error' }) } >
            <div className={s.popup} >
                <div className={s.row} >
                    <span className={s.textTitle}>Ошибка:</span> <span className={s.text} >{message}</span>
                </div>
                <div className={s.row} >
                    <button onClick={onClose} >OK</button>
                </div>
            </div>
        </div>
    )
}

export default PopupMessage