import { useState, useEffect } from 'react';
import axios from 'axios';
 
const useTeme = (url) => {
  const [teme, setTeme] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    axios.get(url)
      .then((response) => {
        setTeme(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Greška pri učitavanju tema:', error);
        setError(error);
        setIsLoading(false);
      }); 
    return () => setError(null);
  }, [url]);

  return { teme, isLoading, error };
};

export default useTeme;
