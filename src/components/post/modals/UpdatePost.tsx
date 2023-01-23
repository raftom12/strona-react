import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {PencilSquare} from 'react-bootstrap-icons';

import {useForm} from 'react-hook-form';
import axios, {AxiosError} from "axios";
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';


export default function UpdatePost(props: any) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const postId = props.number;
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

    const onSubmit = async (fData: any) => {
        console.log(fData)
        const formData = new FormData()
        let file = fData.file
        console.log(file)
        formData.append("id", postId);
        formData.append("Header", fData.header);
        formData.append("Text", fData.text);
        formData.append("file", fData.file[0]);

        try {
            const response = await axios.post(
                "https://localhost:5001/api/posts/update",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('_auth')}`

                    },
                }
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
        <PencilSquare onClick={handleShow} style={{width: "25", height: "25"}}/>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>header</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("header")}
                                placeholder="header"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>text</Form.Label>
                            <Form.Control
                                type="text"
                                {...register("text")}
                                placeholder="text"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>file</Form.Label>
                            <Form.Control
                                type="file"
                                {...register("file")}
                                placeholder="file"
                                accept="image/*"
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
                            Submit Post
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}