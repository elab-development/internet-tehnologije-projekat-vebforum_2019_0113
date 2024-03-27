import axios from 'axios';
import React from 'react';

const CommentComponent = ({ comment,deleteComment }) => {

  const user = JSON.parse(sessionStorage.getItem('user')); //trenutni ulogovani korisnik, izvlacimo ovaj podatak da bismo mogli da omogucimo brisanje i izmenu komentara koje je kreirao sam korisnik

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
        deleteComment(comment.id_komentara); //fja brise komentar iz lokalne memorije
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    };
    
  return (
    <div className="comment">
      <span className="comment-date">{formattedDate}</span>
      <span className="comment-text">{comment.tekst_komentara}</span>
      {comment.user.id_korisnika === user.id && ( // Check if comment was created by current user
        <button onClick={handleDelete}>Obriši komentar</button>
      )}
    </div>
  );
};

export default CommentComponent;
