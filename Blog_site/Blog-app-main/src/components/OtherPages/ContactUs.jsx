import { Link } from 'react-router-dom';
import Logo from '../Header/Logo';
import { SocialIcons } from '../Footer/FooterBottom';
import { Container } from 'react-bootstrap';
import styles from './SignInSignUpForm.module.css';
import signInImage from '../../assets/signIn.webp';


function ContactUs() {

    const handleLogin = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className={styles.bg}>
                <Container className={styles.container}>
                    <div className={styles.left}>
                        <Link to="/" className={styles.logo}>
                            <Logo />
                        </Link>
                        <div className={styles.formContent}>
                            <h1 className={styles.heading}>
                                Contact Us now!
                            </h1>
                            <form onSubmit={handleLogin} autoComplete="off" className={styles.form}>
                                <input type="text" name="name" placeholder="Your name" required />
                                <input type="email" name="email" placeholder="Your email" />
                                <input type="email" name="email" placeholder="Subject" />
                                <textarea name="message" placeholder="Your message" />
                                <button type="submit">Send Message</button>
                            </form>
                        </div>
                        <SocialIcons />
                    </div>
                    <div className={styles.right}>
                        <img src={signInImage} className={styles.sinInImage} loading="lazy" />
                    </div>
                </Container>
            </div>
        </>
    );
}

export default ContactUs;
