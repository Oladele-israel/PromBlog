import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../../slices/articlesSlice";
import styles from "./FeaturedPosts.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../OtherPages/Loading";

function FeaturedPost() {
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <div className={`${styles.bg}`} id="featured">
      <Container>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p className={styles.error}>Failed to load articles: {error}</p>
        ) : articles && articles.length > 0 ? (
          <div className={`${styles.cards}`}>
            {articles.slice(0, 3).map(
              (
                article // Display first 3 articles
              ) => (
                <Link
                  to={`/articles/${article._id}`}
                  key={article._id}
                  className={styles.card}
                >
                  <img
                    loading="lazy"
                    src={article.featuredImage || "placeholder-image-url.jpg"}
                    alt={article.title || "Card image"}
                    className={styles.image}
                  />
                  <div className={styles.overlay}>
                    <span className={styles.category}>
                      {article.category || "Uncategorized"}
                    </span>
                    <h1 className={styles.title}>
                      {article.title ? article.title.slice(0, 30) : "Untitled"}
                      ...
                    </h1>
                    <div className={styles.info}>
                      <img
                        src={
                          article.featuredImage || "placeholder-author-url.jpg"
                        }
                        alt="Author image"
                        className={styles.authorImage}
                      />
                      <p className={styles.readingTime}>
                        {article.readingTime
                          ? `${article.readingTime} min read`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <p className={styles.noArticles}>No featured articles found.</p>
        )}
      </Container>
    </div>
  );
}

export default FeaturedPost;
