import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data);
      // Dodajte kod za obradu uspešne registracije, na primer preusmeravanje na prijavu.
    } catch (error) {
      console.error(error.response.data);
      // Dodajte kod za obradu greške prilikom registracije.
    }
  };

  return (
    <div className="objave-container">
      <form onSubmit={handleSubmit} className="objava">
        <h2>Registracija</h2>
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ime"
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="search-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Lozinka"
            className="search-input"
            required
          />
        </div>
        <button type="submit" className="details-button">
          Registruj se
        </button>
      </form>
    </div>
  );
};

export default Register;
