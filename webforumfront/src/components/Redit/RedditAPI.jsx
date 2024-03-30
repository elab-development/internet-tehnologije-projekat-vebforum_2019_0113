// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RedditAPI = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Uzmi 10 najnovijih postova iz subreddit-a vezanog za IT sektor  
//         const response = await axios.get('https://www.reddit.com/r/tech/.json?limit=10');

//         // Proveri da li je zahtev uspeo
//         if (response.status === 200) {
//           // Filtriraj samo podatke o postovima
//           const postData = response.data?.data?.children.map(child => child.data);
//           setPosts(postData);
//         } else {
//           console.error('Error fetching data from Reddit API');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{margin:"10%"}}>
//       <h2>Reddit Posts - IT & AI</h2>
//       {posts.map((post, index) => (
//         <div key={index} className="post-card">
//           <h3>{post.title}</h3>
//           <img src={post.thumbnail} alt="Post Thumbnail" />
//           <p>Author: {post.author}</p>
//           <p>Number of Comments: {post.num_comments}</p>
//           <p>Score: {post.score}</p>
//           <p>Link: <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">{post.permalink}</a></p>
//           <a href={post.url} target="_blank" rel="noopener noreferrer">Go to Post</a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RedditAPI;





import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

// Asinhrona funkcija koja dohvata podatke
const fetchPosts = async () => {
  const response = await axios.get('https://www.reddit.com/r/tech/.json?limit=10');
  if (response.status === 200) {
    return response.data?.data?.children.map(child => child.data);
  } else {
    throw new Error('Error fetching data from Reddit API');
  }
};

const RedditAPI = () => {
  // Koristi `useQuery` hook za upravljanje i keširanje zahteva
  const { data: posts, isLoading, error } = useQuery('redditTechPosts', fetchPosts, {
    // Opciono, konfiguriši ponašanje keširanja
    staleTime: 1000 * 60 * 5, // 5 minuta
    cacheTime: 1000 * 60 * 15, // 15 minuta
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div style={{ margin: "10%" }}>
      <h2>Reddit Posts - IT & AI</h2>
      {posts?.map((post, index) => (
        <div key={index} className="post-card">
          <h3>{post.title}</h3>
          <img src={post.thumbnail} alt="Post Thumbnail" />
          <p>Author: {post.author}</p>
          <p>Number of Comments: {post.num_comments}</p>
          <p>Score: {post.score}</p>
          <p>Link: <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">{post.permalink}</a></p>
          <a href={post.url} target="_blank" rel="noopener noreferrer">Go to Post</a>
        </div>
      ))}
    </div>
  );
};

export default RedditAPI;
