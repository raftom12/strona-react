import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {withIsAuthenticated} from 'react-auth-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './Sidebar';
import Cond from './Cond';

class Pasek extends Component {
    render() {

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <SideBar />

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin/Pannel">AdminPanel</Nav.Link>
                        </Nav>
                        <Nav>
                           <Cond />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Pasek;
