import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { CgSun, CgMoon } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../slices/darkModeSlice";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import Search from "./Search";
import { fetchUser } from "../../slices/authSlice";

const AuthenticatedNav = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.darkMode);
  const [mobile, setMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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

  const handleLogout = () => {
    dispatch(logoutUser());
    setMobile(false);
  };
  // getting and displaying the initials
  const getUserInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return isAuthenticated ? (
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
        <Link to="/createPost" className={styles.navItem}>
          Create Post
        </Link>
        <Link to="/" className={`${styles.navItem} md:hidden`}>
          my profile
        </Link>
        {mobile && (
          <button onClick={handleLogout} className={styles.signInMobile}>
            Logout
          </button>
        )}
      </nav>
      <div className={styles.navbarActions}>
        <Search />
        <button
          className={styles.toggleButton}
          aria-label="Toggle between dark and light mode"
          onClick={() => dispatch(toggleDarkMode())}
        >
          {isDarkMode ? <CgSun /> : <CgMoon />}
        </button>
        <div
          className={`rounded-full p-2 text-center border-2 border-zinc-950 bg-black text-xl text-white cursor-pointer hidden lg:block ${
            isDarkMode && "text-blue-700"
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {getUserInitials(user.user.name || "User name")}
        </div>
        {dropdownOpen && (
          <div
            className="absolute right-2 mt-40  bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg py-2 w-40 hidden md:block"
            style={{ zIndex: 1000 }}
          >
            <Link
              to="/profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <button
        className={styles.mobileIcon}
        onClick={() => setMobile(!mobile)}
        aria-label={mobile ? "Close mobile menu" : "Open mobile menu"}
      >
        {mobile ? <RiCloseFill /> : <RiMenu3Fill />}
      </button>
    </div>
  ) : null;
};

export default AuthenticatedNav;
