import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../slices/articlesSlice';
import styles from './FeaturedPosts.module.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../OtherPages/Loading';

function FeaturedPosts() {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles);
    
    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);


    return (
        <div className={styles.bg} id='featured'>
            <Container>
                {articles && articles.length > 0 ? (
                    <div className={styles.cards}>
                        {articles.slice(8, 11).map((article, index) => (
                            <Link to={`articles/${article.id}`} key={index} className={styles.card}>
                                <img loading="lazy" src={article.image} alt="Card image" className={styles.image} />
                                <div className={styles.overlay}>
                                    <span className={styles.category}>{article.category}</span>
                                    <h1 className={styles.title}>{article.title.slice(0, 30)}...</h1>
                                    <div className={styles.info}>
                                        <img src={article.author_image} alt="Card image" className={styles.authorImage} />
                                        <p className={styles.readingTime}>{article.reading_time}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Loading/>
                )}
            </Container>
        </div>
    );
}

export default FeaturedPosts;
