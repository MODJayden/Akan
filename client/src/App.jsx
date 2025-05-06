import { Route, Routes } from "react-router-dom";
import Navbar from "./components/component/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/component/Footer";
import Lessons from "./Pages/Lessons";
import Pronunciation from "./Pages/Pronounciation";
import Exercises from "./Pages/Excercise";
import Culture from "./Pages/Culture";
import Dictionary from "./Pages/Dictionary";
import History from "./Pages/History";
import Linguistics from "./Pages/Linguistics";
import Studies from "./Pages/Studies";
import Community from "./Pages/Community";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./store/auth";
import { useEffect } from "react";
import AuthWrapper from "./components/component/AuthWrapper";
import NotFound from "./Pages/NotFound"; // Import the NotFound component

const App = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Home />
            </AuthWrapper>
          }
        />
        <Route
          path="/language/lessons"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Lessons />
            </AuthWrapper>
          }
        />
        <Route
          path="/language/pronunciation"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Pronunciation />
            </AuthWrapper>
          }
        />
        <Route
          path="/language/exercises"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Exercises />
            </AuthWrapper>
          }
        />
        <Route
          path="/culture"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Culture />
            </AuthWrapper>
          }
        />
        <Route
          path="/dictionary"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Dictionary />
            </AuthWrapper>
          }
        />
        <Route
          path="/research/history"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <History />
            </AuthWrapper>
          }
        />
        <Route
          path="/research/linguistics"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Linguistics />
            </AuthWrapper>
          }
        />
        <Route
          path="/research/cultural-studies"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Studies />
            </AuthWrapper>
          }
        />
        <Route
          path="/community"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Community />
            </AuthWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated} loading={loading}>
              <Login />
            </AuthWrapper>
          }
        />
        {/* Catch-all route for 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
