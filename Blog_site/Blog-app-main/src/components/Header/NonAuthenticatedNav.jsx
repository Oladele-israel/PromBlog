import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { CgSun, CgMoon } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../slices/darkModeSlice";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import Search from "./Search";

const NonAuthenticatedNav = () => {
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const isDarkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    body.style.overflow = mobile ? "hidden" : "auto";
    html.style.overflow = mobile ? "hidden" : "auto";

    return () => {
      body.style.overflow = "auto";
      html.style.overflow = "auto";
    };
  }, [mobile]);

  return (
    <div className={styles.navbar}>
      <nav className={mobile ? styles.navListMobile : styles.navList}>
        <ScrollLink
          to="home"
          spy={true}
          smooth={true}
          offset={-100}
          duration={250}
          className={styles.navItem}
          onClick={() => mobile && setMobile(false)}
        >
          Home
        </ScrollLink>
        <ScrollLink
          to="featured"
          spy={true}
          smooth={true}
          offset={-50}
          duration={250}
          className={styles.navItem}
          onClick={() => mobile && setMobile(false)}
        >
          Featured
        </ScrollLink>
        <ScrollLink
          to="tags"
          spy={true}
          smooth={true}
          offset={-50}
          duration={250}
          className={styles.navItem}
          onClick={() => mobile && setMobile(false)}
        >
          Tags
        </ScrollLink>
        <ScrollLink
          to="articles"
          spy={true}
          smooth={true}
          offset={-50}
          duration={250}
          className={styles.navItem}
          onClick={() => mobile && setMobile(false)}
        >
          Articles
        </ScrollLink>
        <ScrollLink
          to="contact"
          spy={true}
          smooth={true}
          offset={-100}
          duration={250}
          className={styles.navItem}
          onClick={() => mobile && setMobile(false)}
        >
          Contact
        </ScrollLink>
        {mobile && (
          <Link
            to="/signin"
            onClick={() => setMobile(false)}
            className={styles.signInMobile}
          >
            Sign In
          </Link>
        )}
      </nav>
      <div className={styles.navbarActions}>
        <Search />
        <button
          className={styles.toggleButton}
          aria-label="Toggle between dark and light mode"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {isDarkMode.theme ? <CgSun /> : <CgMoon />}
        </button>
        <Link to="/signin" className={`${styles.signInLink} whitespace-nowrap`}>
          Sign In
        </Link>
      </div>
      <button
        className={styles.mobileIcon}
        onClick={() => setMobile(!mobile)}
        aria-label={mobile ? "Close mobile menu" : "Open mobile menu"}
      >
        {mobile ? <RiCloseFill /> : <RiMenu3Fill />}
      </button>
    </div>
  );
};

export default NonAuthenticatedNav;
