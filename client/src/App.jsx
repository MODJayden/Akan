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

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/language/lessons" element={<Lessons />} />
        <Route path="/language/pronunciation" element={<Pronunciation />} />
        <Route path="/language/exercises" element={<Exercises />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/research/history" element={<History />} />
        <Route path="/research/linguistics" element={<Linguistics />} />
        <Route path="/research/cultural-studies" element={<Studies />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
