import { Container } from "react-bootstrap";

import styles from "./NotFound.module.css";

import splach from "../../assets/splach.webp";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={styles.bg}>
      <Container className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon}>
            4<img src={splach} alt="404 error" loading="lazy" />4
          </div>
          <h2>The Page You Are Looking For doesn&apos;t Exist.</h2>
          <Link to="/">Go Home</Link>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
