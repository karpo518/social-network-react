import { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { TProfileActions, updateStatus } from "../../../redux/profile-reducer";
import { TAppState } from "../../../redux/redux-store";
import s from "./ProfileInfo.module.css";

export type TProps = {
  status: string
}

const ProfileStatusWithHooks: FC<TProps> = (props) => {
    let [editMode,setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)
    
    const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TProfileActions>>();

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {

        setStatus(e.currentTarget.value)
    }

    return (
    <div className={s.statusBlock}>
      {editMode ? (
        <div>
          <input
            autoFocus={true}
            onBlur={ deactivateMode }
            onChange={ onStatusChange }
            type="text"
            value={status}
          />
        </div>
      ) : (
        <div>
          <span onDoubleClick={ activateMode } >{status}</span>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
