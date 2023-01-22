import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { render } from "react-dom";
import ShowPost from '../modals/ShowPost';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import '../post.scss'

import React, { useState , useEffect} from 'react'
import InfiniteScroll  from 'react-infinite-scroller'
import axios, { AxiosError } from 'axios';

export default function SearchPost() {
    const [postList, setPostList] = useState([]);
    const[query , setQuery] = useState('');
    const [hasMoreItems, setHasMoreItems] = useState(true);


    const deletePost = (id: number) => {
        setTimeout(() => {
            axios.delete(`https://localhost:7106/api/posts/delete${id}`,
                         {
                             headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                             )
            .then((res) => {
                const newList = postList.filter((post: any) => post?.id !== id);
                setPostList(newList);
            })
            .catch((err) => {
                console.log(err);
            })
        }, 15)
    }

    useEffect(() => {
        axios.get(`https://localhost:7106/api/posts/search`,
                  {   params: {query},
                      headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                      )
            .then((res) => {
                const newList = res.data;
                setPostList(newList);

                if(res.data.length===0) {
                    setHasMoreItems(false);
                } else {
                    setHasMoreItems(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [query])




    return (<>
            <Container className={'cont'}>

                <Card body>
                    <Form >
                        <div style={{margin: "20px"}}>
                            <Row xs={2} md={2} className="g-4">
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="comment"
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <p>You need to insert query.</p>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Card>

            </Container>
            <div>
                <div className="section">
                        <Container className={'cont'}>
                            <Row xs={1} md={2} className="g-4">
                                {postList.map((post: any, Id) =>(
                                        <Col>
                                            <Card key={Id}>
                                                <Card.Img variant="top"
                                                    src={post.mediaUrls} alt={"zdj1.jpg"}/>
                                                <Card.Body>
                                                    <Card.Title>{post.header}</Card.Title>
                                                    <Card.Text>
                                                        {post.text}
                                                    </Card.Text>
                                                    <ShowPost number={post.id}/>
                                                </ Card.Body>
                                            </ Card>

                                        </Col>))
                                }
                            </Row>
                        </Container>
                </div>
            </div>
            </>
            )
}
