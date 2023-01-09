import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import axios, {AxiosError} from "axios";
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';


export default function Registerf() {
    const [show, setShow] = useState(false);
    const handleClose = () =>setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false)
    const errorDiv = error
    ? <div className="error">
        <Alert variant={'danger'}>
            <i className="material-icons error-icon"></i>
            {error}
        </Alert>
    </div>
    : '';

    const {register,getValues, handleSubmit, watch} = useForm();

    const onSubmit = async (data: any) => {
        console.log(data)
        try {
            const response = await axios.post(
                "https://localhost:7106/api/auth/register",
                data
            );
            handleClose();
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
            <Nav.Link href="#Register" onClick={handleShow}>Register</Nav.Link>

        <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("firstName", { required: true})}
                                placeholder="firstname"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("lastName", { required: true})}
                                placeholder="lastname"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                {...register("email", { required: true})
                                }
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("username", { required: true})}
                                placeholder="username"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlImput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("password", { required: true})}
                                placeholder="password"
                                autoFocus/>
                        </Form.Group>
                        <Form.Group
                            className="mb-3" controlId="exampleForm.ControlImput2"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
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
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}