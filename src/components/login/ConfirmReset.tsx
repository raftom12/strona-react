import React, {useState, useEffect} from 'react';
import axios, {AxiosError} from "axios"
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useForm} from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

export default function ConfirmReset() {
    const navigate = useNavigate();

    const {email} = useParams();
    const {token} = useParams();
    const decodedtoken = decodeURI(token ?? '')
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
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

    const {register, getValues, handleSubmit, watch} = useForm();

    const onSubmit = async (data: any) => {
        console.log(data)
        data.email = email;
        // data.token = token;
        data.token = decodedtoken;
        try {
            const response = await axios.post(
                "https://localhost:5001/api/auth/resetPassword",
                data
            );
            handleClose();
            navigate("/ConfEmail");
            window.location.reload();

        } catch (err) {
            // @ts-ignore
            setError(err.response.data.message);
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);

            console.log("Error: ", err);
        }
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlImput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                {...register("newPassword", {required: true})}
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






