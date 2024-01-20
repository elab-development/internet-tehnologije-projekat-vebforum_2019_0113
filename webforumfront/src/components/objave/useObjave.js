 
import { useState, useEffect } from 'react';
import axios from 'axios';

const useObjave = (url) => {
  const [objave, setObjave] = useState([]);

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setObjave(response.data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  return [objave, setObjave];
};

export default useObjave;
