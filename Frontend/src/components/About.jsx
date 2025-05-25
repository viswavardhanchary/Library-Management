import profilePic from '../images/me.png';
import '../styles/About.css';

export default function About() {
  return (
    <section className="about-me-dark">
      <div className="profile-photo">
        <img src={profilePic} alt="Viswa Vardhan Chary" />
      </div>

      <div className="about-content">
        <h1>Enjeti Viswa Vardhan Chary</h1>
        <p className="role">
          CSE Student | Full-Stack Developer | AI & ML Enthusiast
        </p>

        <p className="intro">
          Hello! I'm Viswa Vardhan Chary, a computer science student at CVR College of Engineering, Hyderabad.  
          I love crafting web apps with modern tech, mastering DSA in Java, and exploring AI and machine learning.  
          I aim to become a skilled full-stack developer by continuously learning AI and ML, leveraging these technologies to build impactful and innovative software solutions
        </p>

        <div className="contact-links">
          <a
            href="https://www.linkedin.com/in/viswa-vardhan-chary/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com/viswavardhanchary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
           <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
