import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pocetna.css';

const ForumHomePage = () => {
  const [quote, setQuote] = useState('');
  const [joke, setJoke] = useState('');

  useEffect(() => {
    // Fetch a random quote
    const fetchQuote = async () => {
      try {
        const result = await axios.get('https://api.quotable.io/random');
        setQuote(result.data.content);
      } catch (error) {
        console.error('Error fetching the quote:', error);
      }
    };

    // Fetch a random joke
    const fetchJoke = async () => {
      try {
        const result = await axios.get('https://v2.jokeapi.dev/joke/Any');
        if (result.data.type === 'single') {
          setJoke(result.data.joke);
        } else {
          setJoke(`${result.data.setup} ... ${result.data.delivery}`);
        }
      } catch (error) {
        console.error('Error fetching the joke:', error);
      }
    };

    fetchQuote();
    fetchJoke();
  }, []);

  return (
    <div className="forum-homepage">
    <header className="header">
      <h1>Welcome to the Forum!</h1>
      <p>Join the conversation and share your thoughts!</p>
      <div className="icons">
        <i className="fas fa-comments"></i> {/* Chat icon */}
        <i className="fas fa-smile"></i> {/* Smile icon */}
        <i className="fas fa-users"></i> {/* Users icon */}
      </div>
    </header>
    <div className="content">
        
      <div className="quote">
        <h2>Quote of the Day</h2>
        <p>{quote}</p>
      </div>
      <div className="joke">
        <h2>Joke of the Day</h2>
        <p>{joke}</p>
      </div>
    </div> </div>
  );
};

export default ForumHomePage;
