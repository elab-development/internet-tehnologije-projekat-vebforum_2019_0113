import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ObjavaComponent from './ObjavaComponent';
import './ObjaveComponent.css';
import useObjave from './useObjave';

const ObjaveComponent = () => {
    const [objave, setObjave] = useObjave('http://127.0.0.1:8000/api/objave');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/objave')
      .then(response => {
        setObjave(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredObjave = objave.filter(objava =>
    objava.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    || objava.tekst.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
