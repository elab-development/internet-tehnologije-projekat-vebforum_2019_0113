import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentComponent from './CommentComponent ';

const Details = () => {
  const { id } = useParams();
  const [objava, setObjava] = useState(null);
  const [comments, setComments]= useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/objave/${id}`)
      .then(response => {
        setObjava(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = async () => {
    try {
      const token = sessionStorage.getItem('token');  
  
      const response = await axios.post('http://127.0.0.1:8000/api/komentari', {
        tekst: newComment,
        objava_id: id
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Dodavanje tokena u zaglavlju
        }
      });
  
      const { data } = response;
      console.log(data)
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  const obrisiKomentar = (idKomentara) => { //brise iz lokalne memorije
    setComments(comments.filter(comment => comment.id_komentara !== idKomentara));
  };
  if (!objava) {
    return <div>Loading...</div>;
  }
  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  // Function to sort comments based on date
  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });


  return (
    <div className="details-container">
           <div className="details-header" style={{ backgroundColor: '#yourColor' }}>
        <h2 className="details-title">{objava.naziv}</h2>
        <span className="details-category">{objava.tema.naziv_teme}</span>
        <p className="details-date">{objava.datum_objave}</p>
      </div>
      <p className="details-text">{objava.tekst}</p>
      <p className="details-info">
        <strong>Korisnik:</strong> {objava.user.ime}
      </p>
      <p className="details-info">
        <strong>Opis teme:</strong> {objava.tema.opis}
      </p>
      <div className="details-likes">
        <strong>
          <FaThumbsUp style={{ color: 'green' }} />
          {objava.broj_svidjanja}
        </strong>
      </div>
      <div className="details-dislikes">
        <strong>
          <FaThumbsDown style={{ color: 'red' }} />
          {objava.broj_nesvidjanja}
        </strong>
      </div>
      <div>
        <input
          type="text"
          placeholder="Dodaj komentar..."
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <button onClick={submitComment}>Postavi komentar</button>
      </div>
      <button onClick={toggleSortOrder}>
        Sortiraj Komentare {sortAscending ? 'Opadajuće' : 'Rastuće'}
      </button>
      <div>
        {sortedComments.map((comment, index) => (
          <CommentComponent key={index} comment={comment}  deleteComment={obrisiKomentar }/>
        ))}
      </div>
    </div>
  );
};

export default Details;
