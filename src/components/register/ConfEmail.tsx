import '../post/post.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export default function ConfEmail() {
    return (
            <Row xs={1} md={1} className="g-4">
                <Col>
                <Card>
                    <Card.Img variant="top"
                        alt={"zdj1.jpg"}/>
                    <Card.Body>
                        <Card.Header>Header</Card.Header>
                        <Card.Text>
                            yolo
                        </Card.Text>
                        <Button href="/">delete</Button>
                    </ Card.Body>
                </ Card>

                </Col>
                </Row>
    )
}