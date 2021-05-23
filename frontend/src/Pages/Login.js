import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import api from '../services/api';
import { useHistory } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");
    let history = useHistory();

    function handleUser() {
        api.post('/users', { username, password })
            .then(response => {
                if (response.data.msg == "Login Sucesso") {
                    history.push("/home")
                } else {
                    setError("Verifique username e senha")
                }
            })
            .catch(error => {
                console.log(error)
                setError("Verifique username e senha")
            })
    }
    return (
        <>

            <Container>
                <Row className="d-flex justify-content-center align-items-center mt-5">
                    <Col>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </Form.Group>
                            {error === "" ?
                                null :
                                <Alert variant="danger">
                                    {error}
                                </Alert>

                            }
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" onClick={handleUser}>
                                Entrar
                            </Button>
                        </Form>

                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Login;