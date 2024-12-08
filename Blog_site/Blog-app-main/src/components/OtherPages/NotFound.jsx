import { Container } from 'react-bootstrap';
import Logo from "../Header/Logo";
import styles from "./NotFound.module.css";
import FooterBottom from "../Footer/FooterBottom.jsx";
import splach from "../../assets/splach.webp";
import { Link } from 'react-router-dom';


function NotFound() {
    return (
        <div className={styles.bg}>
            <Container className={styles.container}>
                <Link to="/" className={styles.logo}>
                    <Logo />
                </Link>
                <div className={styles.content}>
                    <div className={styles.icon}>
                        4<img src={splach} alt="404 error" loading="lazy" />4
                    </div>
                    <h2>The Page You Are Looking For doesn&apos;t Exist.</h2>
                    <Link to="/">Go Home</Link>
                </div>
                <div className={styles.footer}>
                    <FooterBottom />
                </div>
            </Container>
        </div>
    );
}

export default NotFound;