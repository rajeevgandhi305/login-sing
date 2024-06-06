import React from 'react';
import './home.css';
const HomePage = () => {
  return (
    <div>
    <div className="homepage">
      <div className="logo">Logo</div>
      <nav className="navigation">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="username">Welcome,</div>
    </div>
    </div>
  );
};

export default HomePage;
