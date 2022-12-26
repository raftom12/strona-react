import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios, { AxiosError } from 'axios';
import {useForm} from 'react-hook-form';

export default function Tryt() {
    const{handleSubmit} = useForm();

    const onSubmit = async (data: any) => {
        console.log(data)
        console.log(localStorage.getItem('_auth'));

        try {
            const response = await axios.get(
                    "https://localhost:7106/api/auth/testToken",

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Button variant="primary" type="submit">
                Login
                </Button>
            </Form>

            </>
            )
}