import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {useForm} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios, {AxiosError} from "axios";
import {useSignIn} from "react-auth-kit";
import Nav from 'react-bootstrap/Nav';
import {useNavigate} from 'react-router-dom';


export default function EditProfile({triggerprofile}: any) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [data, setData] = useState(false);
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
    const {register, handleSubmit} = useForm();

    useEffect(() => {
        if (triggerprofile) {
            handleShow();
        }

    }, [triggerprofile]);

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(
                "https://localhost:5001/api/profile/updateProfile",
                data,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                },
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
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit you'r Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>firstName</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("firstName")}
                                placeholder="Correct firstName"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>LastName</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("lastName")}
                                placeholder="Correct lastName"
                                autoFocus
                            />
                        </Form.Group>
                        {errorDiv}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Reset
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}