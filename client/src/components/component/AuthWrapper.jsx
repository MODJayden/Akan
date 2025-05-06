// AuthWrapper.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthStatus } from './../store/auth';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check auth status when component mounts
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    // Handle redirect after Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    
    if (authStatus === 'success') {
      dispatch(checkAuthStatus());
      navigate('/culture');
    }
  }, [dispatch, navigate]);

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  return children;
};

export default AuthWrapper;