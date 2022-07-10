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
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContent from './components/Header/HeaderContent';
import { LoginPage } from './components/Login/LoginPage';
import Music from './components/Music/Music';
import News from './components/News/News';
import { ProfilePage } from './components/Profile/ProfilePage';
import Settings from './components/Settings/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import { UsersPage } from './components/Users/UsersPage';
import './index.css';
import { initializeApp, TAppActions } from "./redux/app-reducer";
import { getInitialized } from './redux/app-selectors';
import store, { TAppState } from "./redux/redux-store";

const { Header, Content, Footer } = Layout;

type TTextMessage = {
  type: string
  message: string
}

const App: FC = () => {

  const initialized = useSelector(getInitialized)

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
    dispatch(initializeApp());
  });

  return  (
    <div>
      {!initialized
      ? <Preloader />
      : (
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

  return <React.StrictMode>
  <BrowserRouter basename={process.env.PUBLIC_URL} >
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
</React.StrictMode> 
}

export default SamuraiJSApp;