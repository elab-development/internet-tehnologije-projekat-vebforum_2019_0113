import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjavaComponent from './ObjavaComponent';
import './ObjaveComponent.css';
import useObjave from './useObjave';
import useTeme from './useTeme'; 

const ObjaveComponent = () => {
  const [objave, setObjave] = useObjave('http://127.0.0.1:8000/api/objave');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTema, setSelectedTema] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { teme, isLoading, error } = useTeme('http://127.0.0.1:8000/api/teme'); 
  console.log(teme)
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/objave')
      .then(response => {
        setObjave(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Resetujemo na prvu stranicu pri pretrazi
  };

  const handleTemaChange = (e) => {
    setSelectedTema(e.target.value);
    console.log(selectedTema)
    console.log(e.target.value)
    setSearchTerm(''); // Resetujemo pretragu pri promeni teme
    setCurrentPage(1); // Resetujemo na prvu stranicu pri promeni teme
  };


  // Prvo filtriramo po nazivu
  let filteredObjave = objave.filter(objava =>
    objava.naziv.toLowerCase().includes(searchTerm.toLowerCase()) ||
    objava.tekst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Zatim filtriramo rezultate po temi ako je odabrana tema
  if (selectedTema !== '') {
    const filteredByTema = [];
    for (let i = 0; i < objave.length; i++) {
      if (parseInt(selectedTema) === objave[i].tema.id_teme) {
        filteredByTema.push(objave[i]);
      }
    }
    filteredObjave = filteredByTema;
  } 
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredObjave.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredObjave.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="objave-container">
     
      <select value={selectedTema} onChange={handleTemaChange} className="admin-select">
        <option value="">Sve teme</option>
        {teme.map(tema => (
          <option key={tema.id_teme} value={tema.id_teme}>{tema.naziv_teme}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Pretraži objave..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      {currentItems.map(objava => (
        <ObjavaComponent key={objava.id} objava={objava} />
      ))}

      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className="page-number">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ObjaveComponent;
