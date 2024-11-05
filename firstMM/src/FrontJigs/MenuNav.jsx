import React from 'react';
import './NavBar.css'; // Import the CSS

const MenuNav = ({ onNavClick }) => {
  return (
    <nav className="navbar">
      {/* Left Side - Website Name */}
      <div className="navbar-left">
        <h1>MindMap.SH</h1>
      </div>

      {/* Center - Navigation Links */}
      <div className="navbar-center">
        <a onClick={() => onNavClick('home')}>Home</a>
        <a onClick={() => onNavClick('progress')}>Progress</a>
        <a onClick={() => onNavClick('about')}>About</a>
      </div>

      {/* Right Side - Profile Picture */}
      <div className="navbar-right">
        <img 
          src="https://via.placeholder.com/40" 
          alt="Profile" 
          className="profile-pic"
        />
      </div>
    </nav>
  );
};

export default MenuNav;
