import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { user, token } = response.data;

      sessionStorage.setItem('token', token);
      console.log('Uspesna prijava!', user);

      
    } catch (error) {
      console.error('Greška pri prijavi:', error.response.data);

     
    }
  };

  return (
    <div className="objave-container">
      <form onSubmit={handleSubmit} className="objava">
        <h2>Prijava</h2>
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
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
