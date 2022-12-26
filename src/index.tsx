import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Pasek from './nav/Pasek';
import Post from './post/Post';
import App from './post/Post';
import Post2 from './post/Post2';
import Tryt from './nav/Tryt';
import Addpost from './post/Addpost';
import Footer from './footer/Footer'
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from "react-auth-kit";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider authType={"localstorage"} authName={"_auth"} >
            <Pasek/>
            <Post/>
            <Footer/>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
