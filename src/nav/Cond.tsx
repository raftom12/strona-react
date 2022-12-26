import {withIsAuthenticated} from 'react-auth-kit';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Loginf from "./Loginf";
import Logout from "./Logout";
import Registerf from "./Registerf";
import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';

export default function Cond(this: any) {
    const [visible, setVisible] = useState(false);
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        checkLogin()
    }, []);

    const checkLogin = async () => {
        try {
            await axios.get(
                    "https://localhost:7106/api/auth/testToken",

                    {headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}

                    )
            setIsLoggedIn(true)
        } catch (e) {
            setIsLoggedIn(false)
            console.log(e)
        }


    }

    if (isLoggedIn) {
        return (
            <Logout/>
        )
    } else {
        return (
            <>
                <Loginf/>
                <Registerf/>
            </>
        )
    }


}
