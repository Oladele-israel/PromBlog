import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../slices/authSlice";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Logo from "../Header/Logo";
import { SocialIcons } from "../Footer/FooterBottom";
import styles from "./SignInSignUpForm.module.css";
import signInImage from "../../assets/signIn.webp";

function SignInSignUpForm() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className={styles.bg}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
          <div className={styles.formContent}>
            <h1 className={styles.heading}>Welcome back!</h1>
            <button
              onClick={handleGoogleLogin}
              className="border rounded-md p-2 bg-gray-900 text-white"
            >
              Login with Google
            </button>
            <p className={styles.paragraph}>
              Use the button above to sign in securely with Google.
            </p>
          </div>
          <SocialIcons />
        </div>
        <div className={styles.right}>
          <img
            src={signInImage}
            alt="Sign in"
            className={styles.signInImage}
            loading="lazy"
          />
        </div>
      </Container>
    </div>
  );
}

export default SignInSignUpForm;
