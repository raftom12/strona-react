import Nav from 'react-bootstrap/Nav';
import React from "react";
import Form from 'react-bootstrap/Form';
import {useSignOut} from "react-auth-kit";
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const{handleSubmit} = useForm();
    const singOut = useSignOut();

    const logout = () => {
            singOut();
            localStorage.clear();
            navigate("/");
            window.location.reload();
        }
    return(
    <Form>
        <Nav.Link onClick={logout} >logout</Nav.Link>
    </Form>
            )
}
