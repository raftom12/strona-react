import {withIsAuthenticated} from 'react-auth-kit';
import Nav from 'react-bootstrap/Nav';
import ResetPassf from '../login/ResetPassf';
import Navbar from 'react-bootstrap/Navbar';
import Loginf from "../login/Loginf";
import Logout from "../login/Logout";
import Registerf from "../register/Registerf";
import React, {useState,useEffect} from "react";
import { useNavigate } from 'react-router';
import axios, { AxiosError } from 'axios';

export default function Cond(this: any) {
    const [visible, setVisible] = useState(false);
    const[isLoggedIn, setIsLoggedIn] = useState(false)
    const [trigger, setTrigger] = useState(false);
    useEffect(() => {
        const email = localStorage.getItem('_auth_state')
        if (email == null )setIsLoggedIn(false)
        else setIsLoggedIn(true)
    }, [trigger]);


    if (isLoggedIn) {
        return (
        <Logout/>
        )
    } else {
        return (
            <>
            <Loginf setTrigger={setTrigger} />
               <Registerf/>
                <ResetPassf trigger={trigger}/>
            </>
        )
    }


}
