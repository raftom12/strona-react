import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import React, {useState,  useEffect} from 'react';
import axios, {AxiosError} from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminPanel() {
    const [char1data, setChar1data] = useState(0);
    const [label1, setLabel1] = useState([]);
    const [value1, setValue1] = useState([]);
    ChartJS.register(ArcElement, Tooltip, Legend);

    const loadPostList = (page: number) => {
        setTimeout(() => {
            axios.get(`https://localhost:7106/api/posts/${page}`,
                      {
                          headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                          )
            .then((res) => {
                console.log(res);
                for(const dataObj of res.data){
                    label1.push(dataObj.labels);
                    value1.push(parseInt(dataObj.value ));
                }})
            .catch((err) => {
                console.log(err);
            })

        }, 15)
    }
    const data1 = {
        labels: [],
        datasets: [
            {
                label: '# of Votes',
                data: [1, 20000000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                    ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
            ],
    };








    return (
            <Container className={'cont'}>
            <Row xs={1} md={2} className="g-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                        <Col>
                            <Card>
                                <Pie data={data1} />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit
                                        longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))}
            </Row>
            </Container>
            );
}