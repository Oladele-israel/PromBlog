import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticleById } from "../../slices/articleSlice";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.article);

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
    }
  }, [dispatch, articleId]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 rounded-lg shadow-md">
      {/* Blog Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-gray-800">{article.title}</h1>
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>{article.readingTime}</span>
        </div>
      </div>

      {/* Featured Image */}
      {article.featuredImage && (
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      {/* Blog Content */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        {article.content?.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleDetail;
