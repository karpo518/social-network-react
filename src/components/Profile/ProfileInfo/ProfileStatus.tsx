import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";

type TProps = {
    status: string
    updateStatus: (newStatus: string ) => void
}

type TLocalState = {
    editMode: boolean
    status: string
}


class  ProfileStatus extends React.Component<TProps, TLocalState> {

    state = {
        editMode: false,
        status: this.props.status
    }

    componentDidMount = () => {

        // this.getUserStatus(this.props.profile.userId);
    };

    componentDidUpdate(prevProps: TProps) {
    
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
      }


    activateEditMode = () => {
        this.setState({editMode: true})

    }

    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateStatus(this.state.status)

    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {

        this.setState({status: e.currentTarget.value})
    }

    render () {
        return <div className={s.statusBlock} >
        {
            this.state.editMode 
            ?   <div>
                    <input autoFocus={true} 
                           onBlur={ this.deactivateEditMode }  
                           onChange={ this.onStatusChange } 
                           type="text" 
                           value={this.state.status} />
                </div>
            :   <div>
                    <span onDoubleClick={ this.activateEditMode } >{this.state.status}</span>
                </div>
        }
        </div>
    }
}

export default ProfileStatus;