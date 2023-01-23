import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Addpost from '../post/modals/Addpost';
import Nav from 'react-bootstrap/Nav';
import logo from './lologo.png';
function Sidebar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
            <>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Navbar.Brand onClick={handleShow}> <img style={{height: '40px'}} src={logo} /></Navbar.Brand>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav.Link href="/post/home" onClick={handleShow}>Home</Nav.Link>
                    <Addpost />
                    <Nav.Link href="/post/userpost" onClick={handleShow}>UserPosts</Nav.Link>
                    <Nav.Link href="/post/searchpost" onClick={handleShow}>SearchPost</Nav.Link>
                </Offcanvas.Body>
            </Offcanvas>
            </>
            );
}

export default Sidebar;