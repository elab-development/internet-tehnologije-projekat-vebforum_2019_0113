import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Uvezite Axios

const Dodaj = () => {
  const [selectedTema, setSelectedTema] = useState('');
  const [naziv, setNaziv] = useState('');
  const [tekst, setTekst] = useState('');
  const [teme, setTeme] = useState([]);

  useEffect(() => {
    // Učitavanje tema iz baze podataka pomoću Axios-a
    axios.get('http://127.0.0.1:8000/api/teme')
      .then((response) => {
        setTeme(response.data.data);
      })
      .catch((error) => {
        console.error('Greška pri učitavanju tema:', error);
      });
  }, []);

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
    <div>
      <h2>Kreiraj novi post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Izaberite temu:</label>
          <select value={selectedTema} onChange={handleTemaChange}>
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
          <input type="text" value={naziv} onChange={handleNazivChange} required />
        </div>
        <div>
          <label>Tekst posta:</label>
          <textarea value={tekst} onChange={handleTekstChange} required></textarea>
        </div>
        <div>
          <button type="submit">Objavi post</button>
        </div>
      </form>
    </div>
  );
};

export default Dodaj;
