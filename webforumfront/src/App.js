import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ForumHomepage from './components/home/ForumHomePage';
 
import Navbar from './components/navbar/Navbar';
import ObjaveComponent from './components/objave/ObjaveComponent ';
import Details from './components/objave/Details';
import Register from './components/loginRegistracija/Register';
import Login from './components/loginRegistracija/Login';
import Dodaj from './components/objave/Dodaj';
import Admin from './components/Admin/Admin';
import RedditAPI from './components/Redit/RedditAPI';

function App() {
 
  const [token, setToken]= useState(null);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar token={token} setToken={setToken}></Navbar>
        <Routes>
          <Route path="/" element={<ForumHomepage />} />
          <Route path="/objave/:id" element={<Details  />} />
          <Route path="/objave" element={<ObjaveComponent  />} />
          <Route path="/dodaj" element={<Dodaj  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/login" element={<Login token={token} setToken={setToken} />} />
          <Route path="/redit" element={<RedditAPI  />} />
          <Route path="/admin" element={<Admin  />} />



        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
