import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
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
import AdminLayout from "./Pages/admin/AdminLayout";
import UserLayout from "./Pages/UserLayout";
import UploadLessons from "./Pages/admin/UploadLessons";
import UploadExcersice from "./Pages/admin/UploadExcersice";
import NotFound from "./Pages/NotFound";
import Resources from "./Pages/admin/Resources";
import Begginers from "./Pages/Begginers";
import Intermediate from "./Pages/Intermediate";
import Advanced from "./Pages/Advanced";
import PracticeVocabs from "./Pages/PracticeVocabs";
import FillinPractice from "./Pages/FillinPractice";
import SentencePractice from "./Pages/SentencePractice";
import Alphabets from "./Pages/admin/Alphabets";
import Phrases from "./Pages/admin/Phrases";
import UploadCulture from "./Pages/admin/UploadCulture";
import DictionaryAdmin from "./Pages/admin/DictionaryAdmin";
import ReviewDictionary from "./Pages/admin/ReviewDictionary";
import AdminHistory from "./Pages/admin/AdminHistory";
import DocumentReview from "./Pages/admin/DocumentReview";
import Profile from "./Pages/Profile";

const App = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/admin"
          element={
            <AuthWrapper
              isAuthenticated={isAuthenticated}
              loading={loading}
              user={user}
            >
              <AdminLayout />
            </AuthWrapper>
          }
        >
          <Route path="lessons/upload" element={<UploadLessons />} />
          <Route path="excercises/upload" element={<UploadExcersice />} />
          <Route path="resources/upload" element={<Resources />} />
          <Route path="resources/alphabets" element={<Alphabets />} />
          <Route path="resources/phrases" element={<Phrases />} />
          <Route path="resources/culture/upload" element={<UploadCulture />} />
          <Route path="dictionary/admin" element={<DictionaryAdmin />} />
          {<Route path="dictionary/review" element={<ReviewDictionary />} />}
          {<Route path="history/add" element={<AdminHistory />} />}
          {<Route path="history/review" element={<DocumentReview />} />}
        </Route>
        <Route
          path="/"
          element={
            <AuthWrapper
              isAuthenticated={isAuthenticated}
              loading={loading}
              user={user}
            >
              <UserLayout />
            </AuthWrapper>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="akan/language/lessons" element={<Lessons />} />
          <Route path="language/pronunciation" element={<Pronunciation />} />
          <Route path="akan/language/exercises" element={<Exercises />} />
          <Route path="culture" element={<Culture />} />
          <Route path="dictionary" element={<Dictionary />} />
          <Route path="research/history" element={<History />} />
          <Route path="research/linguistics" element={<Linguistics />} />
          <Route path="research/cultural-studies" element={<Studies />} />
          <Route path="akan/community" element={<Community />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="akan/language/beginners" element={<Begginers />} />
          <Route path="akan/lesson/intermediate" element={<Intermediate />} />
          <Route path="akan/lesson/advanced" element={<Advanced />} />
          <Route path="akan/exercise/vocab" element={<PracticeVocabs />} />
          <Route path="akan/exercise/fillin" element={<FillinPractice />} />
          <Route path="akan/exercise/sentence" element={<SentencePractice />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
