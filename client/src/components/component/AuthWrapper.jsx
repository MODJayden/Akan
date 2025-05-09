// AuthWrapper.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "../../store/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthWrapper = ({ children, isAuthenticated, loading, user }) => {
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
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && pathname.includes("/akan/")) {
      navigate("/login", { replace: true });
    }
    if (!isAuthenticated && pathname.includes("/admin/")) {
      navigate("/login", { replace: true });
    }
    if(isAuthenticated && pathname.includes("/admin/") && !user?.role === "admin") {
      navigate("/", { replace: true });
    }
    if(isAuthenticated && pathname.includes("/akan/") && user?.role === "admin") {
      navigate("/admin/excercises/upload", { replace: true });
    }
  }, [isAuthenticated, navigate,location]);

  // Added all relevant dependencies

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );

  return children;
};

export default AuthWrapper;
