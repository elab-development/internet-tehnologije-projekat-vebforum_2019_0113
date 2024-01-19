 
import React from 'react';
 

const CommentComponent = ({ comment }) => {
  return (
    <div className="comment">
      <span className="comment-date">{comment.date}</span>
      <span className="comment-text">{comment.text}</span>
    </div>
  );
};

export default CommentComponent;
