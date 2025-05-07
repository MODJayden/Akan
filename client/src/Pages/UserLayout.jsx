import Footer from "@/components/component/Footer";
import Navbar from "@/components/component/Navbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default UserLayout;
