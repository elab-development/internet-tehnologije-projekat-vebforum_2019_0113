import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentComponent from './CommentComponent ';

const Details = ({comments, setComments}) => {
  const { id } = useParams();
  const [objava, setObjava] = useState(null);
  
  const [newComment, setNewComment] = useState('');

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

  const submitComment = () => {
    const comment = {
      text: newComment,
      date: new Date().toISOString(),
      objavaId: id
    };
    setComments([...comments, comment]);
    setNewComment(''); // Reset the comment input field
  };

  if (!objava) {
    return <div>Loading...</div>;
  }

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
      <div>
        {comments.map((comment, index) => (
            <CommentComponent key={index} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default Details;
