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
    const [value2, setValue2] = useState([]);
    const [value3, setValue3] = useState([]);


    const loadPostList = () => {
        setTimeout(() => {
            axios.get(`https://localhost:7106/api/admin/UserActivityStatsAllTime`,
                      {
                          headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                          )
            .then((res:any) => {
                console.log(res);
                //@ts-ignore
                const newList = label1.concat(res.data);
                console.log(newList);
                //@ts-ignore
                const labels = newList[0].userName;
                //@ts-ignore
                let label = newList.map(({ userName }) => userName);
                let value1 = newList.map(({ postsCount }) => postsCount);
                let value2 = newList.map(({ commentsCount }) => commentsCount);
                let value3 = newList.map(({ filesCount }) => filesCount);
                setLabel1(label);
                setValue1(value1);
                setValue1(value2);
                setValue1(value3);
                })
            .catch((err) => {
                console.log(err);
            })

        }, 15)
    }
    useEffect(() => {
        loadPostList();
        }, [])
    const data1 = {
        labels: label1,
        datasets: [
            {
                label: '# of Votes',
                data: value1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 62, 135, 0.2)'
                    ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 62, 135, 1)'
                ],
                borderWidth: 1,
            },
            ],
    };
    const data2 = {
        labels: label1,
        datasets: [
            {
                label: '# of Votes',
                data: value2,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 62, 135, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 62, 135, 1)'
                ],
                borderWidth: 1,
            },
            ],
    };
    const data3 = {
        labels: label1,
        datasets: [
            {
                label: '# of Votes',
                data: value3,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 62, 135, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 62, 135, 1)'
                ],
                borderWidth: 1,
            },
            ],
    };








    return (
            <Container className={'cont'}>
            <Row xs={1} md={2} className="g-4">
                        <Col>
                            <Card>
                                <Pie data={data1} />
                                <Card.Body>
                                    <Card.Title>Posts </Card.Title>
                                    <Card.Text>
                                        which user wrote the most?
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Pie data={data2} />
                                <Card.Body>
                                    <Card.Title>Comments </Card.Title>
                                    <Card.Text>
                                        which user wrote the most?
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Pie data={data3} />
                                <Card.Body>
                                    <Card.Title>Files </Card.Title>
                                    <Card.Text>
                                        which user add the most?
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

            </Row>
            </Container>
            );
}