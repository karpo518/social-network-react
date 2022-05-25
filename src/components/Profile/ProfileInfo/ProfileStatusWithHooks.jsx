import React, { useEffect, useState } from "react";
import s from "./ProfileInfo.module.css";

const ProfileStatusWithHooks = (props) => {
    let [editMode,setEditMode] = useState(false)
    let [status,setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    },[props.status])

    const activateMode = () => {
        setEditMode(true)
    }

    const deactivateMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {

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
