import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.css';

function Loading() {
    return (
        <Spinner animation="border" role="status" className={styles.loading}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
}

export default Loading;
