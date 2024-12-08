import { useEffect, useState } from "react";
import styles from "./AllArticles.module.css";
import { Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "./../OtherPages/Loading";
import { Heart, MessageCircle } from "lucide-react";

function AllArticles() {
  const articles = useSelector((state) => state.articles);
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const articlesPerPage = 6;
  let liked = true;

  const isDarkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    if (Array.isArray(articles) && articles.length > 0) {
      const initialArticles = articles.slice(0, articlesPerPage);
      setDisplayedArticles(initialArticles);
    }
  }, [articles]);

  const loadMoreArticles = () => {
    const currentCount = displayedArticles.length;
    const nextArticles = Array.isArray(articles)
      ? articles.slice(currentCount, currentCount + 3)
      : [];
    setDisplayedArticles([...displayedArticles, ...nextArticles]);
  };

  return (
    <div className={styles.bg} id="articles">
      <Container
        className={`${styles.container} ${
          displayedArticles.length === 0 ? styles.centeredContainer : ""
        }`}
      >
        {Array.isArray(displayedArticles) && displayedArticles.length > 0 ? (
          displayedArticles.map((article) => (
            <Link
              to={`articles/${article.id}`}
              key={article.id}
              className={`${styles.card} card`}
            >
              <Card.Img
                variant="top"
                src={article.image}
                className={styles.cardImage}
                loading="lazy"
                alt={article.title}
              />
              <Card.Body className={styles.cardBody}>
                <Card.Text className={styles.cardCategory}>
                  {article.category}
                </Card.Text>
                <Card.Title className={styles.cardTitle}>
                  {article.title}
                </Card.Title>
                {Array.isArray(article.sections) &&
                  article.sections.length > 0 && (
                    <Card.Text className={styles.cardDescription}>
                      {article.sections[0].content.slice(0, 150)}...
                    </Card.Text>
                  )}
                <div className={styles.cardInfo}>
                  <Card.Img
                    className={styles.authorImage}
                    src={article.author_image}
                    alt={article.author}
                    loading="lazy"
                  />
                  <div className={styles.cardTime}>
                    <FaRegClock className={styles.cardClock} />
                    <Card.Text className={styles.readingTime}>
                      {article.reading_time}
                    </Card.Text>
                  </div>
                </div>
              </Card.Body>
              {/* the icons and the comment session  */}
              <div className="border-t p-4 flex items-center justify-between">
                {/* Like Button */}
                <button
                  className={`flex items-center space-x-2  hover:text-blue-500`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all ${
                      liked
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-500"
                    } hover:bg-blue-200`}
                  >
                    <Heart className="text-2xl" />
                  </div>
                </button>

                {/* Comments */}
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <span className="text-xl">
                    <MessageCircle
                      className={`${
                        isDarkMode.theme ? "text-slate-300" : "text-black"
                      }`}
                    />
                  </span>
                  <span
                    className={`${
                      isDarkMode.theme
                        ? "text-xl text-slate-200"
                        : "text-slate-700"
                    }`}
                  >
                    Comments
                  </span>
                </button>

                {/* Share */}
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
                  onClick={() => alert("Post shared!")}
                >
                  <span className="text-xl">🔗</span>
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </Container>
      {Array.isArray(displayedArticles) &&
        displayedArticles.length <
          (Array.isArray(articles) ? articles.length : 0) && (
          <button onClick={loadMoreArticles} className={styles.loadMoreBtn}>
            Load More
          </button>
        )}
    </div>
  );
}

export default AllArticles;
// {isDarkMode.theme ? <CgSun /> : <CgMoon />}
