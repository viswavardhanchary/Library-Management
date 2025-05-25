import { Link } from "react-router-dom";
import '../styles/Footer.css';
export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-sections">
        <Link to="/about" className="footer-about">About</Link>
        <Link to="/help" className="footer-help">Help</Link>
      </div>
      <div className="para-section">&copy; 2025 , Build By Enjeti Viswa Vardhan Chary.All Rights Reserved</div>
    </div>
  )
}