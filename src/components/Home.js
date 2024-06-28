import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1 className="title">Welcome to Brewery Review System</h1>
        <p className="description">Explore and review breweries near you. Find new favorites and share your experiences with the community!</p>
        <div className="button-container">
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;