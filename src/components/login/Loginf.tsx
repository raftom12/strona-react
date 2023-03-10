import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {useForm} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios, {AxiosError} from "axios";
import {useSignIn} from "react-auth-kit";
import Nav from 'react-bootstrap/Nav';
import {useNavigate} from 'react-router-dom';


export default function Loginf({setTrigger}: any) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false)
    const Resetpassword = () => {
        setTrigger(true);
        handleClose();
    }
    const errorDiv = error
        ? <div className="error">
            <Alert variant={'danger'}>
                <i className="material-icons error-icon"></i>
                {error} <Nav.Link onClick={() => Resetpassword()}>Forgot your password?</Nav.Link>
            </Alert>
        </div>
        : '';
    const {register, handleSubmit} = useForm();
    const signIn = useSignIn();

    const onSubmit = async (data: any) => {
        console.log(data)

        try {
            const response = await axios.post(
                "https://localhost:5001/api/auth/login",
                data
            );
            signIn({
                token: response.data.jwtToken,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {email: data.email},
            });
            handleClose();
            navigate("/post/home");
            window.location.reload();

        } catch (err) {
            // @ts-ignore
            setError(err.response.data.message);
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);

            console.log("Error: ", err);
        }
    };


    return (
        <>
            <Nav.Link onClick={handleShow}>login</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                {...register("email")}
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3" controlId="exampleForm.ControlImput2"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("password")}
                                placeholder="password"
                                autoFocus/>
                        </Form.Group>
                        {errorDiv}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}