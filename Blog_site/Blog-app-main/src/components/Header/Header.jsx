import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../../slices/authSlice";
import Logo from "./Logo";
import Navbar from "./Navbar";
import styles from "./Header.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  console.log("this is the user header -->", user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
