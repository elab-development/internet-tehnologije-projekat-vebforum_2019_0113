 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjavaComponent from './ObjavaComponent';  
import './ObjaveComponent.css';

const ObjaveComponent = () => {
  const [objave, setObjave] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/objave')
      .then(response => {
        setObjave(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="objave-container">
      {objave.map(objava => (
        <ObjavaComponent key={objava.id} objava={objava} />
      ))}
    </div>
  );
};

export default ObjaveComponent;
