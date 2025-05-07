// AuthWrapper.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, isAuthenticated, loading,user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

 
  
  useEffect(() => {
    // Handle redirect after Google OAuth callback
    const urlParams = new URLSearchParams(location.search); // Use location.search from useLocation
    const authStatus = urlParams.get("auth");

    if (authStatus === "success") {
      // This specific re-check can be useful after an OAuth redirect
      // to ensure the state is immediately updated.
      dispatch(checkAuthStatus());
      navigate("/"); // Navigate to a clean path after processing OAuth params
    }

    // Redirect from /login if already authenticated
    if (isAuthenticated && pathname === "/login") {
      navigate("/", { replace: true });
    }
    if (isAuthenticated && user?.role === "admin") {
      navigate("/admin/excercises/upload", { replace: true });
    }
  }, [dispatch, isAuthenticated, ]); // Added all relevant dependencies

  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  return children;
};

export default AuthWrapper;
