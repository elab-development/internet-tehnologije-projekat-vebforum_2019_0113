 
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OjavaComponent = ({ objava }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/objave/${objava.id}`);
  };

  return (
    <div className="objava">
      <h2>{objava.naziv}</h2>
      <p>{objava.tekst}</p>
      <button onClick={goToDetails} className="details-button">DETALJI</button>
    </div>
  );
};

export default OjavaComponent;
