import Card from 'react-bootstrap/Card';
import { Trash} from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {render} from "react-dom";
import ShowPost from '../modals/ShowPost';
import UpdatePost from '../modals/UpdatePost';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../post.scss'

import React, {useState, useEffect, useMemo} from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import axios, {AxiosError} from 'axios';

export default function UserPost() {

    const [postList, setPostList] = useState([]);
    const [hasMoreItems, setHasMoreItems] = useState(true);

    const deletePost = (id: number) => {
        setTimeout(() => {
            axios.delete(`https://localhost:5001/api/posts/delete`,
                {
                    params: {id},
                    headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                }
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


    const loadPostList = (page: number) => {
        setTimeout(() => {
            axios.get(`https://localhost:5001/api/posts/user/${page}`,
                {
                    headers: {Authorization: `Bearer ${localStorage.getItem('_auth')}`}
                }
            )
                .then((res) => {
                    const newList = postList.concat(res.data);
                    setPostList(newList);

                    if (res.data.length === 0) {
                        setHasMoreItems(false);
                    } else {
                        setHasMoreItems(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

        }, 15)
    }

    useEffect(() => {
    }, [setPostList])

    return (
        <div>
            <div className="section">
                <InfiniteScroll
                    threshold={0}
                    pageStart={0}
                    loadMore={loadPostList}
                    hasMore={hasMoreItems}
                    loader={<div className="text-center">loading data ...</div>}>
                    <Container className={'cont'}>
                        <Row xs={1} md={2} className="g-4">
                            {postList.map((post: any, Id) => (
                                <Col>
                                    <Card key={Id}>
                                        <Card.Img variant="top"
                                                  src={post.mediaUrls} alt={"zdj1.jpg"}/>
                                        <Card.Body>
                                            <Card.Title>{post.header}</Card.Title>
                                            <Card.Text>
                                                {post.text}
                                            </Card.Text>
                                            <Trash style={{width: "25", height: "25"}} onClick={() => deletePost(post.id)}/>
                                            <ShowPost number={post.id}/>
                                            <UpdatePost number={post.id}/>
                                        </ Card.Body>
                                    </ Card>

                                </Col>))
                            }
                        </Row>
                    </Container>

                </InfiniteScroll>
                {hasMoreItems ? "" : <div className="text-center">no data anymore ...</div>}
            </div>
        </div>
    )
}
