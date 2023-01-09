import React from 'react';
import { Routes ,Route } from "react-router-dom"
import logo from './logo.svg';
import Post from './components/post/Post';
import Loginf from './components/login/Loginf';
import Filler from './components/filler/Filler';
import './App.css';

function App() {
  return (
          <>
          <Routes>
              <Route path="/" element ={<Filler/>}/>
              <Route path="/home" element = {<Post />}/>
              <Route path="/conformEmiail" element ={<Loginf/>}/>
          </Routes>
          </>
  );
}

export default App;
