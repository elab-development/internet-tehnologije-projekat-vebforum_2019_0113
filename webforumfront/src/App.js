import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ForumHomepage from './components/home/ForumHomePage';
 
import Navbar from './components/navbar/Navbar';
import ObjaveComponent from './components/objave/ObjaveComponent ';
import Details from './components/objave/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<ForumHomepage />} />
          <Route path="/objave/:id" element={<Details />} />
          <Route path="/objave" element={<ObjaveComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
