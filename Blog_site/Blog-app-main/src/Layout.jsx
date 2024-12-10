import FooterTop from "./components/Footer/FooterTop";
import FooterBottom from "./components/Footer/FooterBottom";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";

const Layout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default Layout;
