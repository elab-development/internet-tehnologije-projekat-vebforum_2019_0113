import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjavaComponent from './ObjavaComponent';
import './ObjaveComponent.css';

const ObjaveComponent = () => {
  const [objave, setObjave] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/objave')
      .then(response => {
        setObjave(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredObjave = objave.filter(objava => 
    objava.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    || objava.tekst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="objave-container">
      <input 
        type="text" 
        placeholder="Pretraži objave..." 
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {filteredObjave.map(objava => (
        <ObjavaComponent key={objava.id} objava={objava} />
      ))}
    </div>
  );
};

export default ObjaveComponent;
