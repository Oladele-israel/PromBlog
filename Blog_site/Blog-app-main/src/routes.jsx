import { Routes, Route, useLocation } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import ContactUs from "./components/OtherPages/ContactUs";
import SignInSignUpForm from "./components/OtherPages/SignInSignUpForm";
import ArticleDetails from "./components/OtherPages/ArticleDetails";
import NotFound from "./components/OtherPages/NotFound";
import AllTags from "./components/HomePages/AllTags";
import Tag from "./components/HomePages/Tag";
import CreatePost from "./components/OtherPages/CreatePost";
import { AnimatePresence, motion } from "framer-motion";

function MyRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.5 } }}
        exit={{ opacity: 0, y: "100vh", transition: { duration: 0.5 } }}
      >
        <Routes>
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/signin" element={<SignInSignUpForm />} />
          <Route path="/articles/:articleId" element={<ArticleDetails />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/articles/:articleId/contactus"
            element={<ContactUs />}
          />
          <Route path="/tags" element={<AllTags />} />
          <Route path="/tags/:tag" element={<Tag />} />
          <Route path="/tags/:tag/contactus" element={<ContactUs />} />
          <Route
            path="/tags/:tag/articles/:articleId"
            element={<ArticleDetails />}
          />
          <Route
            path="/tags/:tag/articles/:articleId/contactus"
            element={<ContactUs />}
          />
          <Route path="/tags/contactus" element={<ContactUs />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default MyRoutes;
