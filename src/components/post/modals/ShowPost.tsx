import React, {useState,  useEffect, useCallback} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useForm} from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { PersonCircle , Trash} from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import axios, {AxiosError} from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import ReactTimeAgo from 'react-time-ago'

export default function ShowPost(props: any) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [count, setCount] = useState(0);
    const postId = props.number;
    const [data, setdata] = useState([]);
    const{register, handleSubmit, reset} = useForm();

    const call =() => {
        axios.get(`https://localhost:5001/api/posts/getById`,
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
        }

    useEffect(() => {
        call();
    }, [count])

    const deleteComment = (id: number, email: string) => {
        console.log(email);
        const test = localStorage?.getItem('_auth_state');
        console.log(test)
        const loki = JSON.parse(test?? "");
        if(email == loki.email){
            setTimeout(() => {
                axios.delete(`https://localhost:5001/api/comments/delete`,
                             {   params:{id},
                                 headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                                 )
            .then((res) => {
                setCount(count + 1);
            })
            .catch((err) => {
                console.log(err);
            })
            }, 15)
        }
    }
    const onSubmit = async (comentdata: any) => {
        comentdata.postId = postId;
    try {
            const response = await axios.post(
                    "https://localhost:5001/api/comments/create",
                    comentdata,
                    {headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                    );
            setCount(count + 1);
            reset();
            // @ts-ignore
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
    const renderlist = (data: any) => { return( data?.comments?.map((coment: any, Id: number) =>(
<MDBCard className="mb-4" key={Id} >
    <MDBCardBody>
        <p>{coment?.text}</p>

        <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
                <PersonCircle style={{width: "25", height: "25"}}/>
                <p className="small mb-0 ms-2">{coment?.user.firstName} {coment?.user.lastName}</p>
            </div>
            <div className="d-flex flex-row align-items-center">
                <p className="small text-muted mb-0"><ReactTimeAgo date={coment?.created} locale="pl-PL"/></p>
                <MDBIcon
                    far
                    icon="thumbs-up mx-2 fa-xs text-black"
                    style={{ marginTop: "-0.16rem" }}
                />
                <Trash onClick={() =>deleteComment(coment?.id, coment?.user?.email)} style={{width: "15", height: "15"}}/>
            </div>
        </div>

    </MDBCardBody>
</MDBCard>
            )))}




    return (
        <>
            <Button variant="danger" onClick={handleShow}>show</Button>

        <Modal show={show} size="lg" onHide={handleClose}>
            {renderimage(data)}


                <Modal.Body>
                    <Modal.Title style={{margin: "2%"}} >{renderheader(data)}</Modal.Title>
                    <p style={{margin: "2%"}}>{rendertext(data)}</p>
                </Modal.Body>
            <MDBContainer className="mt-28" style={{ maxWidth: "95%", minWidth: "95%" }}>
                <MDBRow className="justify-content-center">
                    <MDBCol md="14" lg="14">
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                {...register("text", { required: true})}
                                placeholder="comment"
                                onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(onSubmit);
                                }
                            }}
                                autoFocus
                            />
                        </Form.Group>
                        </Form>
                        {renderlist(data)}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}