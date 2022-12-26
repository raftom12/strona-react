import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import Addpost from '../post/Addpost';
import Nav from 'react-bootstrap/Nav';
function Sidebar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
            <>
            <Navbar.Brand onClick={handleShow}>Studentbook</Navbar.Brand>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>MENU</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Addpost />
                </Offcanvas.Body>
            </Offcanvas>
            </>
            );
}

export default Sidebar;