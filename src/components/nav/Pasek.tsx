import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {withIsAuthenticated} from 'react-auth-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './Sidebar';
import Cond from './Cond';
import {useNavigate} from 'react-router-dom';
import axios, {AxiosError} from "axios";

export default function Pasek() {
    const navigate = useNavigate();
    const call = () => {
        axios.get('https://localhost:5001/api/profile/getCurrentUser',
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
            })
            .then((res) => {
                if (res.data.role === "Administrator") navigate("/admin/Pannel");
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <SideBar/>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => call()} >AdminPanel</Nav.Link>
                    </Nav>
                    <Nav>
                        <Cond/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}


