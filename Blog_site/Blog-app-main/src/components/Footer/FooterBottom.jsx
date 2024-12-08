import { Container } from 'react-bootstrap';
import styles from './FooterBottom.module.css';
import { FaFacebook, FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';


function FooterBottom() {
    const year = new Date().getFullYear();

    return (
        <div className={styles.bg}>
            <span className={styles.hr} />
            <Container className={styles.container}>
                <span className={styles.logoAndCpr}>QuirVibe &copy; {year}. All rights reserved.</span>
                <SocialIcons />
            </Container>
        </div>
    );
}

export default FooterBottom;



export function SocialIcons() {
    return (
        <div className={styles.socialIcons}>
            <a href="https://www.facebook.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="facebook">
                <FaFacebook />
            </a>
            <a href="https://www.twitter.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="X aka twitter">
                <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <AiFillInstagram />
            </a>
            <a href="https://www.linkedin.com/in/abdelrahmmaan/" className={styles.socialLink} target="_blank" rel="noopener noreferrer"  aria-label="linkedin of the author">
                <FaLinkedinIn />
            </a>
            <a href="https://www.github.com" className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="github">
                <FaGithub />
            </a>
        </div>
    );
}

