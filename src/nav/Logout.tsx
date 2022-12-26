import Nav from 'react-bootstrap/Nav';
import React from "react";
import Form from 'react-bootstrap/Form';
import {useSignOut} from "react-auth-kit";
import {useForm} from 'react-hook-form';

export default function Logout() {
    const{handleSubmit} = useForm();
    const singOut = useSignOut();

    const logout = () => {
            singOut();
            localStorage.clear();
            window.location.reload();
        }
    return(
    <Form>
        <Nav.Link onClick={logout} >logout</Nav.Link>
    </Form>
            )
}
