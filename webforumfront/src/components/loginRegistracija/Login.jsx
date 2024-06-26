import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({token,setToken}) => {
  let navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: 'kiki123@gmail.com',
    password: 'kiki123',
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
      if(response.data.status==200){
          sessionStorage.setItem('token', response.data.Token);
          sessionStorage.setItem('user', JSON.stringify(response.data.User));
          setToken(response.data.Token);
          console.log('Uspesna prijava!', user);
          if(response.data.User.jeAdmin==1 || response.data.User.jeModeratorZajednice==1 ){
            navigate('/admin')
          }else{
            navigate('/objave');
        }
      }else{
        alert("GRESKA!")
      }
      
      
      
    } catch (error) {
      console.error('Greška pri prijavi:', error.response.data);
      alert("GRESKA!")
     
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
