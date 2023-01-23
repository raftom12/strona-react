import '../post/post.scss'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Reg from './path220.png';
import '../post/post.scss'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container'

export default function ConfEmail() {
    return (
        <Container className="cont">
            <Row xs={1} md={1} className="g-4">
                <Card>
                    <img className="align-items-center justify-content-between" style={{height: '590px'}} src={Reg}/>

                </ Card>
            </Row>
        </Container>
    )
}