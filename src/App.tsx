import React from 'react';
import {Routes, Route} from "react-router-dom"
import Post from './components/post/basepost/Post';
import UserPost from './components/post/userpost/UserPost';
import SearchPost from './components/post/searchpost/SearchPost';
import Filler from './components/filler/Filler';
import AdminPanel from './components/admin/AdminPanel';
import ConfEmail from './components/register/ConfEmail';
import ConfirmReset from './components/login/ConfirmReset';
import './App.css';
import ConfirmEmail from './components/register/ConfirmEmail';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Filler/>}/>
                <Route path="/post/home" element={<Post/>}/>
                <Route path="/auth/confEmail" element={<ConfEmail/>}/>
                <Route path="/auth/thEmail" element={<th/>}/>
                <Route path="/auth/confirmEmail/:email/:token" element={<ConfirmEmail/>}/>
                <Route path="/account/resetPassword/:email/:token" element={<ConfirmReset/>}/>
                <Route path="/admin/Pannel" element={<AdminPanel/>}/>
                <Route path="/post/userpost" element={<UserPost/>}/>
                <Route path="/post/searchpost" element={<SearchPost/>}/>
            </Routes>
        </>
    );
}

export default App;
