import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ObjaveComponent.css';

const ObjaveComponent = () => {
  const [objave, setObjave] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/objave')
      .then(response => {
        setObjave(response.data.data);
        console.log(response.data.data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="objave-container">
      {objave.map(objava => (
        <div key={objava.id} className="objava">
          <h2>{objava.naziv}</h2>
          <p>{objava.tekst}</p>
          <div className="komentari">
            {objava.komentari && objava.komentari.map(komentar => (
              <div key={komentar.id_komentara} className="komentar">
                <p>{komentar.tekst_komentara}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ObjaveComponent;
