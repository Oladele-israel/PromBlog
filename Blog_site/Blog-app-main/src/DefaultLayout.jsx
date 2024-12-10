import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterBottom from "./components/Footer/FooterBottom";
import FooterTop from "./components/Footer/FooterTop";
import Header from "./components/Header/Header";
import ArrowToTop from "./components/OtherPages/ArrowToTop";

function DefaultLayout() {
  return (
    <>
      <Header />
      <FooterTop />
      <FooterBottom />
      <ToastContainer />
      <ArrowToTop />
    </>
  );
}

export default DefaultLayout;
