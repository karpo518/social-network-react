import { TAppState } from './../redux/redux-store';
import { ComponentType } from "react";
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"


let mapStateToPropsForRedirect = (state: TAppState): TProps => ({
    isAuth: state.auth.isAuth
});

type TProps = {
    isAuth: boolean
}

export const withAuthRedirect = (Component: ComponentType<any>) => {


    let RedirectComponent:ComponentType<any> = (props) => {

        let {isAuth, ...restProps} = props

        if(!props.isAuth) return <Navigate to={'/login'} />

        return <Component {...restProps} />
    }
    
    let ConnectedRedirectComponent = connect<TProps, {}, {}, TAppState>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent
}