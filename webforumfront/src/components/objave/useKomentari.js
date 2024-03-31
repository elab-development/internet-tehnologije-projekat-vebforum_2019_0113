import { useState, useEffect } from 'react';
import axios from 'axios';
 
const useKomentari = (url, objavaId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    const fetchKomentare = async () => {
      setIsLoading(true);
      setError(null); 
      try {
        // Učitavanje tokena iz sessionStorage
        const token = sessionStorage.getItem('token'); 
        if (!token) {
          throw new Error("Token nije pronađen.");
        }

        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`   
          },
          params: {
            objava_id: objavaId
          }
        });
        console.log(response)
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          throw new Error('Došlo je do greške prilikom dohvatanja podataka.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (objavaId) {
      fetchKomentare();
    }
  }, [url, objavaId]);

  return { data, setData,isLoading,error  };
};

export default useKomentari;
