import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import React, {Component,useEffect} from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios, { AxiosError } from 'axios';
import Post2 from './Post2';
import './post.scss'

export default function Post(){
    const list = [];
    const axios = require('axios');
    useEffect(()=> {
        getData(); //fetch data from api
    }, []);

    

    const getData = async () => {
        try {
            const response = await axios.get('https://localhost:7106/api/posts/1',


                    {headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}

                    )
        } catch (err) {
            if (err && err instanceof AxiosError)
                console.log(err.response?.data.message);
            else if (err && err instanceof Error) console.log(err.message);

            console.log("Error: ", err);
        }
    };
        return (
                <>
                <Container className={'cont'}>
                <Row xs={1} md={2} className="g-4">
                    {
                        Array.from({length: 8}).map((_, idx) => (
                            <Col>
                                <Post2 />
                            </ Col>
                        ))
                    }
                </Row>
            </Container>
</>
        );

}
