import React, {useState,  useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useForm} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios, {AxiosError} from "axios";
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';

export default function ShowPost(props: any) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [, updateState] = React.useState();
    const postId = props.number
    const [data, setdata] = useState([]);
    const{register, handleSubmit} = useForm();
    useEffect(() => {
        axios.get(`https://localhost:7106/api/posts/getById`,
                  {
                      params: {postId},
                      headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                  })
        .then((res) => {
            setdata(res.data);
        })
        .catch((err) => {
            console.log(err);
        })

    }, [])

    const onSubmit = async (comentdata: any) => {
        comentdata.postId = postId;
    try {
            const response = await axios.post(
                    "https://localhost:7106/api/comments/create",
                    comentdata,
                    {headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                    );
            // @ts-ignore

        updateState();
        } catch (err) {
            // @ts-ignore
            setError(err.response.data.message);
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);

            console.log("Error: ", err);
        }
    };
    const renderheader = (data: any) => {
        return <p>{data.header}</p>}
    const rendertext = (data: any) => {
        return <p>{data.text}</p>}
    const renderimage = (data: any) => {
        return <Card.Img variant="top" style={{padding: "16px"}} src={data.mediaUrls} alt={"zdj1.jpg"}/>}
    const renderlist = (data: any) => { return data?.comments?.map((coment: any, Id: number) =>(<Card style={{ margin: "10px"}} key={Id}><Card.Subtitle className="text-muted">{coment?.user.firstName} {coment?.user.lastName}</Card.Subtitle><Card.Body>{coment?.text}</Card.Body></Card>))}




    return (
        <>
            <Button variant="danger" onClick={handleShow}>show</Button>

        <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{renderheader(data)}</Modal.Title>
                </Modal.Header>
                    {renderimage(data)}
                <Modal.Body>
                    <p>{rendertext(data)}</p>
                </Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div style={{margin: "20px"}}>
                <Row xs={2} md={2} className="g-4">
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                        type="text"
                        {...register("text", { required: true})}
                        placeholder="comment"
                        autoFocus
                    />
                </Form.Group>
                        </Col>
                    <Col>
                <Button variant="primary" type="submit">
                    Send
                </Button>
                        </Col>
                </Row>
                </div>
            </Form>
                    {renderlist(data)}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}