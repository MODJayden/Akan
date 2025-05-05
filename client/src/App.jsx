import { Route, Routes } from "react-router-dom";
import Navbar from "./components/component/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/component/Footer";
import Lessons from "./Pages/Lessons";
import Pronunciation from "./Pages/Pronounciation";
import Exercises from "./Pages/Excercise";
import Culture from "./Pages/Culture";

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
        
      </Routes>
      <Footer />
    </>
  );
};
export default App;
