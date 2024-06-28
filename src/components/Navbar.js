// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Brewery Review System</span>
        </Link>

        <div className="navbar-auth">
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
          </ul>
          <Link to="/login" className="navbar-button">Login</Link>
          <Link to="/signup" className="navbar-button">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;