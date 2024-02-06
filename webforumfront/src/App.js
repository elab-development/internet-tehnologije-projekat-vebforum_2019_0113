import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ForumHomepage from './components/home/ForumHomePage';
 
import Navbar from './components/navbar/Navbar';
import ObjaveComponent from './components/objave/ObjaveComponent ';
import Details from './components/objave/Details';
import Register from './components/loginRegistracija/Register';
import Login from './components/loginRegistracija/Login';

function App() {
  const [comments, setComments]= useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ForumHomepage />} />
          <Route path="/objave/:id" element={<Details comments={comments}  setComments={setComments}/>} />
          <Route path="/objave" element={<ObjaveComponent  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
