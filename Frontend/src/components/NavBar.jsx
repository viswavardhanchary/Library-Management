import { useState } from "react";
import '../styles/NavBar.css';
import { Link } from "react-router-dom";

export default function NavBar() {
   const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="heading">LibMag</Link>
      </div>
      <div className={`navbar-right ${isOpen ? "open" : ""}`}>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/help" className="nav-link">Help</Link>
      </div>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
    </nav>
  );
}