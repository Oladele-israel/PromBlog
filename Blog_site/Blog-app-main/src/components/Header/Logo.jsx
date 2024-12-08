import { animateScroll } from "react-scroll";
import styles from "./Logo.module.css";

function Logo() {
  const options = {
    duration: 500,
    smooth: "easeInOutQuint",
  };

  const handleScrollToTop = () => {
    animateScroll.scrollToTop(options);
  };

  return (
    <div className={styles.logo} onClick={handleScrollToTop}>
      Prime<span className={styles.highlight}>V</span>ibe
    </div>
  );
}

export default Logo;
