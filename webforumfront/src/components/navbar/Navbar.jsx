import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import './Navbar.css';

const Navbar = ({token,setToken}) => {
  let navigate=useNavigate();
  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem('token');   
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          'Authorization': `Bearer ${token}`  
        }
      });

      setToken(null);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      {token ? (
        <>
          <Link to="/dodaj" className="nav-link">Dodaj</Link>
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
