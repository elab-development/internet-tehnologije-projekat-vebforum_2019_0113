 
import React from 'react';

const OjavaComponent = ({ objava }) => {
  return (
    <div className="objava">
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
  );
};

export default OjavaComponent;
