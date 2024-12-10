import Logo from "./Logo";
import Navbar from "./Navbar";
import styles from "./Header.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className={styles.bg}>
      <Container className={styles.header} id="home">
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Navbar />
      </Container>
    </div>
  );
}

export default Header;
