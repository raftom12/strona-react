import Card from 'react-bootstrap/Card';
import React, {useState,  useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../post.scss'

export default function SearchCard({setTquery}:any) {

    const[localText , setLocalText] = useState('');
    const clickHandler = () => {
        setTquery(localText);
        console.log(localText);
    }

    return(
            <Container className={'cont'}>

                <Card body>
                    <Form >
                        <div style={{margin: "20px"}}>
                            <Row xs={2} md={2} className="g-4">
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => setLocalText(e.target.value)}
                                            placeholder="comment"
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={clickHandler} >
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </Card>

            </Container>
            )
}
