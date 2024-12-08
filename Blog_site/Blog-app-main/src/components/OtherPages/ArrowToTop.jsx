import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import styles from "./ArrowToTop.module.css";

function ArrowToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const newProgress = (scrollTop / height) * 100;
    setProgress(newProgress);
    // console.log('Scroll Progress:', newProgress);
  };

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", toggleVisible);

    // Clean-up function to remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const outerCircleStyles = {
    position: "fixed",
    right: "7%",
    bottom: "7%",
    width: "50px",
    height: "50px",
    padding: "14px",
    background: `conic-gradient(#669bbc ${progress}%, white ${progress}%)`,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.6s",
    zIndex: "2",
  };

  return (
    <>
      <div
        onClick={scrollToTop}
        className={visible ? styles.outerCircle : styles.notVisible}
        style={visible ? outerCircleStyles : null}
      >
        <button className={styles.arrowToTopStyles} aria-label="Arrow To Top">
          <FaArrowUp />
        </button>
      </div>
    </>
  );
}

export default ArrowToTop;
