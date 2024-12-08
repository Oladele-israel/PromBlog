import { Container } from "react-bootstrap";
import styles from "./FirstSection.module.css";
import { toast } from "react-toastify";
import { useState } from "react";

function FirstSection() {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Successfully subscribed!");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className={styles.bg}>
      <Container>
        <h1 className={`${styles.heroMainTitle} text-center`}>
          Hello, we are <span className="text-[#669bbc]">PrimeVibe</span>. Share
          your thoughts, stories, and ideas.
        </h1>

        <div className={styles.row}>
          <p className={styles.paragraph}>
            Subscribe to our email newsletter and be the first to receive
            exciting updates, exclusive content, and special offers straight to
            your inbox.
          </p>
          <form
            id="form"
            onSubmit={handleSubscribe}
            action="/submit"
            method="post"
            className={styles.form}
          >
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
              placeholder="Email Address"
              value={email}
              className={styles.emailInput}
              autoComplete="email"
            />
            <button
              type="submit"
              className={styles.emailSubscribe}
              aria-label="subscribe or submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default FirstSection;
