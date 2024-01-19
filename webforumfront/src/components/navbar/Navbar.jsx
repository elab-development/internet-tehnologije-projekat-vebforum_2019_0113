import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/objave" className="nav-link">Objave</Link>
      
    </nav>
  );
};

export default Navbar;
