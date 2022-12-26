import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import React, {Component} from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './post.scss'

class Post2 extends Component {
    render() {
        return (

            <Card>
                <Card.Img variant="top"
                          src="https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png"/>
                <Card.Body>
                    <Card.Header>Makieta Postu</Card.Header>
                    <Card.Text>
                        Mamy tu przykładowy post który może być upubliczniony.
                        Zawiera Obrazek , Temat oraz tekst.
                        Może być modyfikowany w zalerzności od potrzeby.
                    </Card.Text>
                </ Card.Body>
            </ Card>

        );

}
}

export default Post2;