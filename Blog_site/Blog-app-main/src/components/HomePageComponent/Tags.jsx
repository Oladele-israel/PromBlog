import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowRedoOutline } from "react-icons/io5";
import { TbTags } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../slices/articlesSlice";
import { toggleDarkMode } from "../../slices/darkModeSlice";
import business from "../../assets/business.webp";
import fashion from "../../assets/fashion.webp";
import ideas from "../../assets/ideas.webp";
import lifestyle from "../../assets/lifestyle.webp";
import design from "../../assets/design.webp";
import technology from "../../assets/Technology.webp";

const categoryImageMap = {
  health: ideas,
  technology: technology,
  business: business,
  fashion: fashion,
  lifestyle: lifestyle,
  design: design,
  education: ideas,
};

const Tags = () => {
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector((state) => state.articles);
  const isDarkMode = useSelector((state) => state.darkMode.theme);
  const categories = articles?.map((article) => article.category) || [];

  useEffect(() => {
    dispatch(fetchArticles());

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, isDarkMode]);

  return (
    <section
      className={`w-full px-4 py-8 flex flex-col items-center ${
        isDarkMode ? "bg-[#161616] text-white" : "bg-white text-gray-900"
      }`}
      id="tags"
    >
      {/* Header */}
      <div
        className={`font-bold w-full max-w-3xl p-4 text-center text-2xl rounded-md ${
          isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        <TbTags className="mx-auto text-4xl mb-2 text-[#669bbc]" />
        <h1>Popular Tags</h1>
      </div>

      {/* Card Section */}
      <div
        className={`w-full max-w-7xl  mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  justify-center mx-auto`}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-md shadow-md ${
              isDarkMode
                ? "bg-[#1e1e1e] text-white"
                : "bg-slate-100 text-gray-900"
            }`}
          >
            <img
              src={categoryImageMap[category.toLowerCase()] || ideas}
              alt={`${category} thumbnail`}
              className="rounded-full w-24 h-24"
            />
            <div className="ml-4 flex flex-col text-sm">
              <h1 className="text-lg font-semibold">{category}</h1>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>
                {
                  articles.filter((article) => article.category === category)
                    .length
                }{" "}
                post
                {articles.filter((article) => article.category === category)
                  .length > 1
                  ? "s"
                  : ""}
              </p>
            </div>
            <IoArrowRedoOutline className="ml-auto text-4xl text-[#669bbc]" />
          </div>
        ))}
      </div>

      {/* View All Section */}
      <div
        className={`w-full max-w-3xl mt-8 p-4 text-center rounded-md ${
          isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-slate-100 text-gray-900"
        }`}
      >
        <IoArrowRedoOutline className="mx-auto text-4xl mb-2 text-[#669bbc]" />
        <Link
          to="/all-tags"
          className="text-lg font-bold text-[#669bbc] hover:underline"
        >
          View All
        </Link>
      </div>
    </section>
  );
};

export default Tags;
