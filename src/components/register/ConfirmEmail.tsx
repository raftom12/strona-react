import React, {useState,  useEffect} from 'react';
import axios, {AxiosError} from "axios"
import {useNavigate, useParams} from 'react-router-dom';


export default function ConfirmEmail() {
    const navigate = useNavigate();

    const { email }  = useParams();
    const { token } = useParams();
    const encodedEmail = encodeURIComponent(email?? '' );
    console.log('encodedEMail: ' + encodedEmail)
    console.log('email: ' + email);
    console.log('token ' + token);
    useEffect(() => {
        axios.get(`https://localhost:7106/auth/confirmEmail/${encodedEmail}/${token}`)
        .then((res) => {
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
        })

    }, [email , token])
    return(<></>);
}