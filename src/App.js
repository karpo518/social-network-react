import React, { Suspense } from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarContainer from "./components/Navbar/NavbarContainer";

import HeaderContainer from "./components/Header/HeaderContainer";

import { connect, Provider } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { useEffect } from "react";
import Preloader from "./components/common/Preloader/Preloader";
import { compose } from "redux";
import store from "./redux/redux-store";

// lazy components
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer') )
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer') )
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer') )
const News = React.lazy(() => import('./components/News/News') )
const Music = React.lazy(() => import('./components/Music/Music') )
const Settings = React.lazy(() => import('./components/Settings/Settings') )
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer') )

const App = (props) => {

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
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path="/dialogs/" element={<DialogsContainer />} />
            <Route path="/dialogs/:userId" element={<DialogsContainer />} />
            <Route path="/profile/" element={<ProfileContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginContainer />} />
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
  <BrowserRouter>
    <Provider store={store}>
    <AppContainer />
    </Provider>
  </BrowserRouter>
</React.StrictMode> 
}

export default SamuraiJSApp;
