import { ChangeEvent, FC } from "react";
import s from "./Users.module.css";
import throttle from "lodash.throttle"
import { friendsOnly, TIsFriend } from "../../redux/users-reducer";

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
      let isFriend = e.target.value
      if (friendsOnly.Yes === isFriend || friendsOnly.No === isFriend || friendsOnly.Any === isFriend) { 
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
          <input type="radio" id="isFriendAny" name="isFriend" value={friendsOnly.Any} defaultChecked={props.isFriend === friendsOnly.Any} onChange={onIsFriendChange} />
          <label htmlFor="isFriendAny">Всех</label>
          <input type="radio" id="isFriendYes" name="isFriend" value={friendsOnly.Yes} defaultChecked={props.isFriend === friendsOnly.Yes} onChange={onIsFriendChange} />
          <label htmlFor="isFriendYes">Друзей</label>
          <input type="radio" id="isFriendNo" name="isFriend" value={friendsOnly.No} defaultChecked={props.isFriend === friendsOnly.No} onChange={onIsFriendChange} />
          <label htmlFor="isFriendYes">Всех, кроме друзей</label>
        </div>
      </div>
    );
  }

  export default FilterUsersForm