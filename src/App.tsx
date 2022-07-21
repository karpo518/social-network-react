import { Layout } from 'antd';
import React, { FC, Suspense, useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import './App.less';
import Breadcrumbs from './components/common/Breadcrumbs/Breadcrumbs';
import Page404 from './components/common/Page404/Page404';
import PopupMessage from './components/common/PopupMessage/PopupMessage';
import Preloader from './components/common/Preloader/Preloader';
import HeaderContent from './components/Header/HeaderContent';
import Sidebar from './components/Sidebar/Sidebar';
import './index.css';
import { ErrorPage } from './pages/Error/ErrorPage';
import { EAppStatus, initializeApp, TAppActions } from "./redux/app-reducer";
import { SGetAppStatus } from './redux/app-selectors';
import store, { TAppState } from "./redux/redux-store";

// lazy components
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer') )
const ProfilePage = React.lazy(() => import('./components/Profile/ProfilePage').then(module => ({ default: module.ProfilePage })))
const UsersPage = React.lazy(() => import('./components/Users/UsersPage').then(module => ({ default: module.UsersPage })))
const News = React.lazy(() => import('./components/News/News') )
const Music = React.lazy(() => import('./components/Music/Music') )
const Settings = React.lazy(() => import('./components/Settings/Settings') )
const LoginPage = React.lazy( () => import('./components/Login/LoginPage').then(module => ({ default: module.LoginPage })))
const ChatPage = React.lazy( () => import('./pages/Chat/ChatPage').then(module => ({ default: module.ChatPage })))

const { Header, Content, Footer } = Layout;

type TTextMessage = {
  type: string
  message: string
}

const App: FC = () => {

  const appStatus = useSelector(SGetAppStatus)

  const dispatch = useDispatch<ThunkDispatch<TAppState, unknown, TAppActions>>();

  const [textMessage, setTextMessage] = useState<TTextMessage | null>(null);

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
    if(appStatus !== EAppStatus.broken) {
      dispatch(initializeApp())
    }
  },[appStatus]);

  return  (
    <div className={'wrapper'} >
      { appStatus === EAppStatus.not_inited && <Preloader /> }
      { appStatus === EAppStatus.broken && <ErrorPage /> }
      { appStatus === EAppStatus.inited && (
        <Layout>
          <Header className="header">
            <HeaderContent />
          </Header>
          <Content className="mainContent" >
            <Breadcrumbs />
            <Layout
              className="site-layout-background"
              style={{
                padding: '24px 0',
              }}
            >
              <Sidebar />

              <Content
                style={{
                  padding: '0 24px',
                  minHeight: 280,
                }}
              >
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
                      <Route path="/chat" element={<ChatPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="*" element={<Page404 />} />
                    </Routes>
                  </Suspense>
              </Content>
            </Layout>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            karpo518 ©2022 Created with Ant Design
          </Footer>
        </Layout>
        )
      }
    </div>
  )
};

const SamuraiJSApp: FC = (props) => {

  return <BrowserRouter basename={process.env.PUBLIC_URL} >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJSApp;