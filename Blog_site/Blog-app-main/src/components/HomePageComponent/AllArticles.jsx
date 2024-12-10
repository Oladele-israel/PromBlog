import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../slices/articlesSlice";
import { Link } from "react-router-dom";

const AllArticles = () => {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state.articles);
  console.log("articles--?>", articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section
      className="grid md:grid-cols-2 justify-center  max-w-5xl mx-auto gap-4 p-4"
      id="articles"
    >
      {articles.map((article) => (
        <div
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          key={article._id}
        >
          <img
            src={article.featuredImage}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                {article.category}
              </span>
              <span>{article.readingTime}min read</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
              {article.title}
            </h2>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Published on{" "}
                <span className="font-medium">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2 mt-3">
              {article.tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Link
                to={`/articleDetail/${article._id}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Read More
              </Link>
              <div className="flex items-center gap-1 text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLineCap="round"
                  strokeLineJoin="round"
                  className="lucide lucide-heart"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span>{article.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AllArticles;
