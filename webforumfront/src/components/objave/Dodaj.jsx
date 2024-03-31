import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import useTeme from './useTeme'; 

const Dodaj = () => {
  const [selectedTema, setSelectedTema] = useState('');
  const [naziv, setNaziv] = useState('');
  const [tekst, setTekst] = useState('');
  const { teme, isLoading, error } = useTeme('http://127.0.0.1:8000/api/teme');

  const handleTemaChange = (e) => {
    setSelectedTema(e.target.value);
  };

  const handleNazivChange = (e) => {
    setNaziv(e.target.value);
  };

  const handleTekstChange = (e) => {
    setTekst(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      tema_id: selectedTema,
      naziv,
      tekst,
    };

    const token = sessionStorage.getItem('token');

    // Slanje podataka na server putem Axios POST zahteva
    axios.post('http://127.0.0.1:8000/api/objave', postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log('Objava uspešno kreirana:', response.data);
        // Očistite polja za unos nakon uspešnog kreiranja
        setSelectedTema('');
        setNaziv('');
        setTekst('');
      })
      .catch((error) => {
        console.error('Greška pri kreiranju objave:', error);
      });
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Kreiraj novi post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Izaberite temu:</label>
          <select className="admin-select" value={selectedTema} onChange={handleTemaChange}>
            <option value="">Izaberite temu</option>
            {teme.map((tema) => (
              <option key={tema.id_teme} value={tema.id_teme}>
                {tema.naziv_teme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Naslov posta:</label>
          <input className="admin-input" type="text" value={naziv} onChange={handleNazivChange} required />
        </div>
        <div>
          <label>Tekst posta:</label>
          <textarea className="admin-textarea" value={tekst} onChange={handleTekstChange} required></textarea>
        </div>
        <div>
          <button className="admin-button" type="submit">Objavi post</button>
        </div>
      </form>
    </div>
  );
};

export default Dodaj;
