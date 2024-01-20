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
      </div>
      <div className="rules-section">
        <h2>Pravila Ponašanja na Forumu</h2>
        <p>Dobrodošli u našu zajednicu! Molimo vas da se pridržavate sledećih pravila:</p>
        <ul>
          <li>Bez vređanja ili omalovažavanja drugih korisnika.</li>
          <li>Nema širenja govora mržnje ili diskriminacije bilo koje vrste.</li>
          <li>Budite ljubazni i poštujte mišljenja drugih.</li>
          <li>Ne širite lažne informacije ili sadržaje koji krše autorska prava.</li>
        </ul>
        <p>Zajedno možemo stvoriti prijateljsko i podržavajuće okruženje!</p>
      </div>
    </div>
  );
};

export default ForumHomePage;
