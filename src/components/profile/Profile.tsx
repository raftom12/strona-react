import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {useForm} from 'react-hook-form';
import axios, {AxiosError} from "axios";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import Modal from 'react-bootstrap/Modal';
import {PersonCircle} from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';


export default function Profile({setTriggerprofile}: any) {
    const [show, setShow] = useState(false);
    const handleClose = () => (setShow(false));
    const handleShow = () => setShow(true);
    const [data, setData] = useState([]);
    const [datau, setDatau] = useState([]);

    const Editprofile = () => {
        setTriggerprofile(true);
        handleClose();
    }

    useEffect(() => {
        setTimeout(() => {
            axios.get(`https://localhost:5001/api/profile/getCurrentUser`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                })
                .then((res) => {
                    setData(res?.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 15)

        setTimeout(() => {
            axios.get(`https://localhost:5001/api/profile/UserActivityStatsAllTime`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                })
                .then((res) => {
                    setDatau(res?.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, 15)
    }, [])

    const rendertitle = (data: any) => {
        return (<p>{data.firstName} {data.lastName} Profile</p>)
    }
    const renderfirstname = (data: any) => {
        return <>{data.firstName}</>
    }
    const renderlastname = (data: any) => {
        return <>{data.lastName}</>
    }
    const renderemail = (data: any) => {
        return <>{data.email}</>
    }

    const renderpostnr = (datau: any) => {
        return <>{datau.postsCount}</>
    }
    const rendercommentnr = (datau: any) => {
        return <>{datau.commentsCount}</>
    }
    const renderfilenr = (datau: any) => {
        return <>{datau.filesCount}</>
    }
    const rendernick = (datau: any) => {
        return <>{datau.userName}</>
    }

    return (
        <>
            <Nav.Link onClick={handleShow}>{renderemail(data)}</Nav.Link>

            <Modal show={show} size="lg" onHide={handleClose}>
                <MDBCard style={{borderRadius: '15px'}}>
                    <MDBCardBody className="p-4">
                        <div className="d-flex text-black">
                            <div className="flex-shrink-0">
                                <PersonCircle style={{width: "180px", height: "180px", borderRadius: '10px'}}/>
                            </div>
                            <div className="flex-grow-1 ms-3">
                                <MDBCardTitle>{rendertitle(data)}</MDBCardTitle>
                                <MDBCardText>Nick: {rendernick(datau)} </MDBCardText>
                                <MDBCardText>FirstName: {renderfirstname(data)} </MDBCardText>
                                <MDBCardText>LastName: {renderlastname(data)} </MDBCardText>
                                <MDBCardText>Email: {renderemail(data)}</MDBCardText>
                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                     style={{backgroundColor: '#efefef'}}>
                                    <div>
                                        <p className="small text-muted mb-1">Posts</p>
                                        <p className="mb-0">{renderpostnr(datau)}</p>
                                    </div>
                                    <div className="px-3">
                                        <p className="small text-muted mb-1">Comments</p>
                                        <p className="mb-0">{rendercommentnr(datau)}</p>
                                    </div>
                                    <div>
                                        <p className="small text-muted mb-1">Files</p>
                                        <p className="mb-0">{renderfilenr(datau)}</p>
                                    </div>
                                </div>
                                <div className="d-flex pt-1">
                                    <MDBBtn onClick={() => Editprofile()} outline
                                            className="me-1 flex-grow-1">Edit</MDBBtn>
                                    <MDBBtn onClick={handleClose} className="flex-grow-1">Close</MDBBtn>
                                </div>
                            </div>
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </Modal>
        </>
    );
}
