import React from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { store } from "./store";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./components/pages/Homepage";
import SignInSignUpForm from "./components/OtherPages/SignInSignUpForm";
import ContactUs from "./components/OtherPages/ContactUs";
import CreatePost from "./components/OtherPages/CreatePost";
import NotFound from "./components/OtherPages/NotFound";
import Layout from "./layout";
import ArticleDetail from "./components/OtherPages/ArticleDetail";

const motionWrapper = (Component) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.5 } }}
    exit={{ opacity: 0, y: "100vh", transition: { duration: 0.5 } }}
  >
    <Component />
  </motion.div>
);

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: motionWrapper(Homepage),
      },
      {
        path: "/signin",
        element: motionWrapper(SignInSignUpForm),
      },
      {
        path: "/contactus",
        element: motionWrapper(ContactUs),
      },
      {
        path: "*",
        element: motionWrapper(NotFound),
      },
      {
        path: "/articleDetail/:articleId",
        element: motionWrapper(ArticleDetail),
      },
    ],
  },
  {
    path: "/createPost",
    element: motionWrapper(CreatePost),
  },
]);

// App Component
function App() {
  const isDarkMode = useSelector((state) => state.darkMode);

  return (
    <div data-theme={isDarkMode.theme ? "dark" : ""}>
      <AnimatePresence mode="popLayout" initial={false}>
        <RouterProvider router={router} />
      </AnimatePresence>
      <ToastContainer />
    </div>
  );
}

// React DOM Render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
