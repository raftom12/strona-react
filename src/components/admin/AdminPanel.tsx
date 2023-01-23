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

    const [label2, setLabel2] = useState([]);
    const [value4, setValue4] = useState([]);
    const [datan, setDatan] = useState(0);
    const [datan2, setDatan2] = useState(0);
    const loadfirstList = () => {
        setTimeout(() => {
            axios.get(`https://localhost:5001/api/admin/UserActivityStatsAllTime`,
                      {
                          headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                          )
            .then((res:any) => {
               // console.log(res);
                //@ts-ignore
                const newList = label1.concat(res.data);
                //console.log(newList);
                //@ts-ignore
                const labels = newList[0].userName;
                //@ts-ignore
                let label = newList.map(({ userName }) => userName);
                let value1 = newList.map(({ postsCount }) => postsCount);
                let value2 = newList.map(({ commentsCount }) => commentsCount);
                let value3 = newList.map(({ filesCount }) => filesCount);
                setLabel1(label);
                setValue1(value1);
                setValue2(value2);
                setValue3(value3);
                })
            .catch((err) => {
                console.log(err);
            })

        }, 15)
    }
    const loadsecondList = () => {
        setTimeout(() => {
            axios.get(`https://localhost:5001/api/admin/UsersMemoryUsage`,
                      {
                          headers: { Authorization: `Bearer ${localStorage.getItem('_auth')}`}}
                          )
            .then((res:any) => {
                console.log(Object.keys(res.data))
                console.log(Object.values(res.data))
                const newList = Object.values(res?.data)

                //@ts-ignore
                setLabel2(Object.keys(res?.data));
                //@ts-ignore
                setDatan(newList.reduce((partialSum, a) => partialSum + a, 0));
                setDatan2(400000000-datan);
                setValue4(Object.values(res?.data));

            })
            .catch((err) => {
                console.log(err);
            })

        }, 15)
    }
    useEffect(() => {
        loadfirstList();
        loadsecondList();
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
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                   'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                   'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
            ],
    };
    const data4 = {
        labels: label2,
    datasets: [
            {
                label: '# of Votes',
                data: value4,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
            ],
};

    const data5 = {
        labels: ["taken","free"],
    datasets: [
            {
                label: '# of Votes',
                data: [datan, datan2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
                        <Col>
                        <Card>
                            <Pie data={data4} />
                            <Card.Body>
                                <Card.Title>Space </Card.Title>
                                <Card.Text>
                                    which user take the most?
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
            </Row>
                <Col>
                    <Card>
                        <Pie data={data5} />
                        <Card.Body>
                            <Card.Title>Space total </Card.Title>
                            <Card.Text>
                                When to upgrade?
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            );
}