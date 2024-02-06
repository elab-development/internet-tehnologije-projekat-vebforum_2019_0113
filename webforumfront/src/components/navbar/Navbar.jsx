import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Dodajte import za axios
import './Navbar.css';

const Navbar = () => {
  const handleLogout = async () => {
    try {
      // Izvršite Axios POST zahtev za odjavu
      await axios.post('http://127.0.0.1:8000/api/logout');
       
      sessionStorage.removeItem('token');
       
      window.location.reload();
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
      // Dodajte kod za obradu greške pri odjavi ako je potrebno
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/objave" className="nav-link">Objave</Link>
      {sessionStorage.getItem('token') ? (
        <>
          <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
        </>
      ) : (
        <>
          <Link to="/register" className="nav-link">Register</Link>
          <Link to="/login" className="nav-link">Login</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
