import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [teme, setTeme] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    naziv: '',
    opis: '',
    baner: null,
 
  });

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      baner: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithToken = new FormData();
      formDataWithToken.append('naziv', formData.naziv);
      formDataWithToken.append('opis', formData.opis);
      formDataWithToken.append('baner', formData.baner);
      formDataWithToken.append('zajednica_id', 1);
  
      const token = sessionStorage.getItem('token');  
  
      const response = await axios.post('http://127.0.0.1:8000/api/teme', formDataWithToken, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      setShowModal(false);
    // Resetovanje forme
    setFormData({
        naziv: '',
        opis: '',
        baner: null
    });
    
      setTeme(prevTeme => [...prevTeme, response.data[1]]);
    } catch (error) {
      console.error('Error creating tema:', error);
    }
  };
  
 
  const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/teme/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Brisanje teme iz lokalne memorije
      setTeme(prevTeme => prevTeme.filter(tema => tema.id_teme !== id));
    } catch (error) {
      console.error('Error deleting tema:', error);
    }
  };
  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Panel</h1>
      <button className="admin-add-button" onClick={() => setShowModal(true)}>Dodaj novu temu</button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Status</th>
            <th>Akcije</th> 
          </tr>
        </thead>
        <tbody>
          {teme.map((tema) => (
            <tr key={tema.id_teme}>
              <td>{tema.id_teme}</td>
              <td>{tema.naziv_teme}</td>
              <td>{tema.opis}</td>
              <td>{tema.status}</td>
              <td>
                <button onClick={() => handleDelete(tema.id_teme)}>Obriši</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Dodaj novu temu</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Naziv:</label>
                <input type="text" name="naziv" value={formData.naziv} onChange={handleInputChange} />
              </div>
              <div>
                <label>Opis:</label>
                <textarea name="opis" value={formData.opis} onChange={handleInputChange}></textarea>
              </div>
              <div>
                <label>Baner:</label>
                <input type="file" name="baner" onChange={handleFileChange} />
              </div> 
              <button type="submit">Kreiraj temu</button>
              <button type="button" onClick={() => setShowModal(false)}>Odustani</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
