import React, { ComponentType, FC, Suspense, useState } from "react";
import "./App.css";
import 'antd/dist/antd.min.css'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

/* import HeaderContainer from "./components/Header/HeaderContainer"; */

import { connect, Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { useEffect } from "react";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import store, { TAppState } from "./redux/redux-store";
import Page404 from "./components/common/Page404/Page404";
import PopupMessage from "./components/common/PopupMessage/PopupMessage";


// lazy components
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer') )
const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage').then(module => ({ default: module.ProfilePage })))
const UsersPage = React.lazy(() => import('./components/Users/UsersPage').then(module => ({ default: module.UsersPage })))
const News = React.lazy(() => import('./components/News/News') )
const Music = React.lazy(() => import('./components/Music/Music') )
const Settings = React.lazy(() => import('./components/Settings/Settings') )
const LoginPage = React.lazy( () => import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })))

type TMapStateToProps = {
  initialized: boolean
}

type TMapDispatchToProps = {
  initializeApp: () => void
}

type TProps = TMapStateToProps & TMapDispatchToProps


const App: FC<TProps> = (props) => {

  type TTextMessage = {
    type: string
    message: string
  }

  let [textMessage, setTextMessage] = useState<TTextMessage | null>(null);

  const openErrorMessage = (message: string) => {
    setTextMessage({type: 'error', message: message})
  }

  const closeErrorMessage = () => {
    setTextMessage(null)
  }

  useEffect(() => {

    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
      if(e.reason.message) {
        console.log('Показать ошибку!')
        openErrorMessage(e.reason.message);
      }
    }

    window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
    return () => window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
  }, []);

  useEffect(() => {
    props.initializeApp();
  });
  

  return  (
    <div>
      {!props.initialized
      ? <Preloader />
      : (
        <div className="app-wrapper">
          <Sidebar  />
          <div className="app-wrapper-content">
            {textMessage && <PopupMessage {...textMessage} onClose={closeErrorMessage} /> }
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path="/" element={<Navigate to={'/profile'} /> } />
                <Route path="/dialogs/" element={<DialogsContainer />} />
                <Route path="/dialogs/:userId" element={<DialogsContainer />} />
                <Route path="/profile/" element={<ProfilePage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/news" element={<News />} />
                <Route path="/music" element={<Music />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      ) }
    </div>
  )
};

let mapStateToProps = (state: TAppState) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<ComponentType>(
  connect<TMapStateToProps, TMapDispatchToProps, {}, TAppState>(mapStateToProps,{initializeApp })
)(App)

const SamuraiJSApp: FC = (props) => {

  return <React.StrictMode>
  <BrowserRouter basename={process.env.PUBLIC_URL} >
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
</React.StrictMode> 
}

export default SamuraiJSApp;
