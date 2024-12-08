import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FooterBottom from "./components/Footer/FooterBottom";
import FooterTop from "./components/Footer/FooterTop";
import Header from "./components/Header/Header";
import AllArticles from "./components/HomePages/AllArticles";
import FeaturedPosts from "./components/HomePages/FeaturedPosts";
import FirstSection from "./components/HomePages/FirstSection";
import TopTags from "./components/HomePages/TopTags";
import ArrowToTop from "./components/OtherPages/ArrowToTop";


function DefaultLayout() {
    return(
        <>
            <Header />
            <FirstSection />
            <FeaturedPosts />
            <TopTags />
            <AllArticles />
            <FooterTop />
            <FooterBottom />
            <ToastContainer />
            <ArrowToTop />
        </>
    );
}

export default DefaultLayout;