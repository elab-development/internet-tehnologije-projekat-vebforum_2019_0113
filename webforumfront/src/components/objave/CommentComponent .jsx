import axios from 'axios';
import React, { useState } from 'react';

const CommentComponent = ({ comment, deleteComment }) => {
  const user = JSON.parse(sessionStorage.getItem('user')); // Trenutni ulogovani korisnik

  const [isEditing, setIsEditing] = useState(false); // Stanje koje označava da li se komentar trenutno ažurira
  const [updatedText, setUpdatedText] = useState(comment.tekst_komentara); // Tekst komentara koji se ažurira

  // Convert ISO string to Date object
  const dateObj = new Date(comment.datum_komentarisanja);

  // Format the date in a more readable format (e.g., "Jan 01, 2024, 12:00 PM")
  const formattedDate = dateObj.toLocaleString('en-US', {
    month: 'short', // "Jan", "Feb", etc.
    day: '2-digit', // "01", "02", etc.
    year: 'numeric',
    hour: '2-digit', // "01", "02", etc., based on a 12-hour clock
    minute: '2-digit', // "00", "01", etc.
    hour12: true // Use 12-hour format with AM/PM
  });

  // Function to handle delete comment
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Dobijanje tokena iz sessionStorage-a

      await axios.delete(`http://127.0.0.1:8000/api/komentari/${comment.id_komentara}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Dodavanje tokena u zaglavlju
        }
      });

      // Callback to parent to update comments
      deleteComment(comment.id_komentara); // Funkcija briše komentar iz lokalne memorije
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Function to handle update comment
  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('token'); // Dobijanje tokena iz sessionStorage-a

      await axios.patch(`http://127.0.0.1:8000/api/komentari/izmeniTekst/${comment.id_komentara}`, {
        tekst: updatedText // Novi tekst komentara
      }, {
        headers: {
          'Authorization': `Bearer ${token}` // Dodavanje tokena u zaglavlju
        }
      });

      // Update the comment text locally
      comment.tekst_komentara = updatedText;
      setIsEditing(false); // Završi ažuriranje komentara
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  return (
    <div className="comment">
      <span className="comment-date">{formattedDate}</span>
      {isEditing ? ( // Ako se komentar ažurira, prikaži polje za unos teksta
        <input 
          type="text" 
          value={updatedText} 
          onChange={(e) => setUpdatedText(e.target.value)} 
        />
      ) : (
        <span className="comment-text">{comment.tekst_komentara}</span>
      )}
      {comment.user.id_korisnika === user.id && ( // Check if comment was created by current user
        <>
          {isEditing ? ( // Ako se komentar ažurira, prikaži dugme za završetak ažuriranja
            <button onClick={handleUpdate}>Završi ažuriranje</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Ažuriraj komentar</button>
          )}
          <button onClick={handleDelete}>Obriši komentar</button>
        </>
      )}
    </div>
  );
};

export default CommentComponent;
