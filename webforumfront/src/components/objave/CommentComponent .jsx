import React from 'react';

const CommentComponent = ({ comment }) => {
  // Convert ISO string to Date object
  const dateObj = new Date(comment.date);

  // Format the date in a more readable format (e.g., "Jan 01, 2024, 12:00 PM")
  const formattedDate = dateObj.toLocaleString('en-US', {
    month: 'short', // "Jan", "Feb", etc.
    day: '2-digit', // "01", "02", etc.
    year: 'numeric',
    hour: '2-digit', // "01", "02", etc., based on a 12-hour clock
    minute: '2-digit', // "00", "01", etc.
    hour12: true // Use 12-hour format with AM/PM
  });

  return (
    <div className="comment">
      <span className="comment-date">{formattedDate}</span>
      <span className="comment-text">{comment.text}</span>
    </div>
  );
};

export default CommentComponent;
