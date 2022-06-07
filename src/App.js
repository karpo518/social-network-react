import React, { Suspense, useState } from "react";
import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";

import HeaderContainer from "./components/Header/HeaderContainer";

import { connect, Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { useEffect } from "react";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import store from "./redux/redux-store";
import Page404 from "./components/common/Page404/Page404";
import PopupMessage from "./components/common/PopupMessage/PopupMessage";

// lazy components
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer') )
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer') )
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer') )
const News = React.lazy(() => import('./components/News/News') )
const Music = React.lazy(() => import('./components/Music/Music') )
const Settings = React.lazy(() => import('./components/Settings/Settings') )
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer') )

const App = (props) => {

  let [textMessage,setTextMessage] = useState(null);

  const openErrorMessage = (message) => {
    setTextMessage({type: 'error', message: message})
  }
  
  const closeErrorMessage = () => {
    setTextMessage(null)
  }

  useEffect(() => {

    const catchAllUnhandledErrors = ({reason, promise}) => {
      if(reason.message) {
        console.log('Показать ошибку!')
        openErrorMessage(reason.message);
      }
    }

    window.addEventListener('unhandledrejection', catchAllUnhandledErrors)
    return () => window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
  }, []);

  useEffect(() => {
    props.initializeApp();
  });
  

  return !props.initialized 
  ? <Preloader />
  : (
    <div className="app-wrapper">
      <HeaderContainer />
      <NavbarContainer  />
      <div className="app-wrapper-content">
        {textMessage && <PopupMessage {...textMessage} onClose={closeErrorMessage} /> }
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route exact path="/" element={<Navigate to={'/profile'} /> } />
            <Route path="/dialogs/" element={<DialogsContainer />} />
            <Route path="/dialogs/:userId" element={<DialogsContainer />} />
            <Route path="/profile/" element={<ProfileContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer pageTitle={'User list'} />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

let mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  connect(mapStateToProps,{initializeApp })(App)
)

const SamuraiJSApp = (props) => {

  return <React.StrictMode>
  <BrowserRouter basename={process.env.PUBLIC_URL} >
    <Provider store={store}>
    <AppContainer />
    </Provider>
  </BrowserRouter>
</React.StrictMode> 
}

export default SamuraiJSApp;
