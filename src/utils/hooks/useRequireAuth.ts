import { useSelector } from 'react-redux';
// Hook (use-require-auth.js)
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { sGetAuth } from '../../redux/profile-selectors';



export const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useSelector(sGetAuth);
  let navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuth === false) {
      return navigate(redirectUrl);
    }
  }, [auth, navigate, redirectUrl]);

  return auth;
}