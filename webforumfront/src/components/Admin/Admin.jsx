import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [teme, setTeme] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/teme');
        setTeme(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
        <h1 className="admin-title">Admin Panel</h1>
        <table className="admin-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Opis</th>
                <th>Status</th>
            
            
            </tr>
            </thead>
            <tbody>
            {teme.map((tema) => (
                <tr key={tema.id_teme}>
                <td>{tema.id_teme}</td>
                <td>{tema.naziv_teme}</td>
                <td>{tema.opis}</td>
                <td>{tema.status}</td>
                
            
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
};

export default Admin;
