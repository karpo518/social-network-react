import { ChangeEvent, FC } from "react";
import s from "./Users.module.css";
import throttle from "lodash.throttle"

type TIsFriend = 0 | 1 | 2

type TProps = {
  currentPage: number
  isFriend: TIsFriend
  term: string
  setTerm: (term: string) => void
  setIsFriend: (isFriend: TIsFriend) => void
  onPageChanged: (newPage: number) => void
}

const  FilterUsersForm: FC<TProps> = (props) => {
  
    const tSetTerm = throttle(props.setTerm, 1000, {leading: false})

    const onTermChange = (e: ChangeEvent<HTMLInputElement>): void => {
      let term = e.target.value || ''
      if(props.currentPage !== 1) {
        props.onPageChanged(1)
      }

      tSetTerm(term)
    }

    const onIsFriendChange = (e: ChangeEvent<HTMLInputElement>): void => {
      let isFriend = parseInt(e.target.value)
      if(isFriend === 0 || isFriend === 1 || isFriend === 2) {
        if(props.currentPage !== 1) {
          props.onPageChanged(1)
        }
        props.setIsFriend(isFriend)
      }
    }

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <div className={s.inputsBlock}>
        <div className={s.inputItem}>
          <div className={s.label} >
            <label htmlFor="term">Поиск по имени пользователя</label>
          </div>
          <input id="term" className={s.term} name={'term'} onChange={onTermChange} />
        </div>
        <div className={s.inputItem}>
          <div className={s.label} >Кого показывать?</div>
          <input type="radio" id="isFriendAny" name="isFriend" value={0} defaultChecked={props.isFriend === 0} onChange={onIsFriendChange} />
          <label htmlFor="isFriendAny">Всех</label>
          <input type="radio" id="isFriendYes" name="isFriend" value={1} defaultChecked={props.isFriend === 1} onChange={onIsFriendChange} />
          <label htmlFor="isFriendYes">Друзей</label>
          <input type="radio" id="isFriendNo" name="isFriend" value={2} defaultChecked={props.isFriend === 2} onChange={onIsFriendChange} />
          <label htmlFor="isFriendYes">Всех, кроме друзей</label>
        </div>
      </div>
    );
  }

  export default FilterUsersForm