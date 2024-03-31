import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Details.css';
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import CommentComponent from './CommentComponent ';
import useKomentari from './useKomentari';

const Details = () => {
  const { id } = useParams();
  const [objava, setObjava] = useState(null);
  const { data: comments, setData: setComments, isLoading, error } = useKomentari('http://127.0.0.1:8000/api/komentari', id);

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
      console.log(data);
      setComments([...comments, data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  // Nova funkcija za sviđanje objave
  const likePost = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/svidjanje/objava/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Ažuriranje broja sviđanja u lokalnom stanju
      setObjava(prevState => ({
        ...prevState,
        broj_svidjanja: prevState.broj_svidjanja + 1
      }));
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  // Nova funkcija za nesviđanje objave
  const dislikePost = async () => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/nesvidjanje/objava/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Ažuriranje broja nesviđanja u lokalnom stanju
      setObjava(prevState => ({
        ...prevState,
        broj_nesvidjanja: prevState.broj_nesvidjanja + 1
      }));
    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };

  if (!objava) {
    return <div>Loading...</div>;
  }

  const toggleSortOrder = () => {
    setSortAscending(!sortAscending);
  };

  const sortedComments = [...comments].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });
  const obrisiKomentar = (idKomentara) => {  
    setComments(comments.filter(comment => comment.id_komentara !== idKomentara));
  };
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
      <div className="details-likes" onClick={likePost}>
        <strong>
          <FaThumbsUp style={{ cursor: 'pointer', color: 'green' }} />
          {objava.broj_svidjanja}
        </strong>
      </div>
      <div className="details-dislikes" onClick={dislikePost}>
        <strong>
          <FaThumbsDown style={{ cursor: 'pointer', color: 'red' }} />
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
        {sortedComments.map((comment, index) => (
          <CommentComponent 
            key={index} 
            comment={comment} 
            deleteComment={obrisiKomentar} 
            
        />
        ))}
      </div>
    </div>
  );
};

export default Details;
