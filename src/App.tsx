import React from 'react';
import { Routes ,Route } from "react-router-dom"
import Post from './components/post/basepost/Post';
import UserPost from './components/post/userpost/UserPost';
import SearchSend from './components/post/searchpost/SearchSend';
import Filler from './components/filler/Filler';
import ConfEmail from './components/register/ConfEmail';
import './App.css';
import ConfirmEmail from './components/register/ConfirmEmail';

function App() {
  return (
          <>
          <Routes>
              <Route path="/" element ={<Filler/>}/>
              <Route path="/post/home" element = {<Post />}/>
              <Route path="/auth/confEmail" element ={<ConfEmail/>}/>
              <Route path="/auth/thEmail" element ={<th/>}/>
              <Route path="/auth/confirmEmail/:email/:token" element = {<ConfirmEmail/>}/>
              <Route path="/post/userpost" element = {<UserPost />}/>
              <Route path="/post/searchpost" element = {<SearchSend />}/>
          </Routes>
          </>
  );
}

export default App;
