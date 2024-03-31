import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ token, setToken }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      });

      setToken(null);
      sessionStorage.clear();
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/reddit" className="nav-link">Redit</Link>
      {token ? (
        <>
          <Link to="/dodaj" className="nav-link">Dodaj</Link>
          <Link to="/objave" className="nav-link">Objave</Link>
          {(user && (user.jeAdmin === "1" || user.jeModeratorTeme === "1" || user.jeModeratorZajednice === "1")) && (
            <>
              <Link to="/admin" className="nav-link">Admin</Link>
              <Link to="/admin/statistika" className="nav-link">Admin Statistika</Link>
            </>
          )}
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
